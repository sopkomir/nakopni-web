const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

async function getUploadsPlaylistId() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const data = await res.json();

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
}

function parseDuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  const hours = parseInt(match?.[1] || "0");
  const minutes = parseInt(match?.[2] || "0");
  const seconds = parseInt(match?.[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
}

export async function getLatestVideos() {
  try {
    const uploadsPlaylistId = await getUploadsPlaylistId();

    if (!uploadsPlaylistId) {
      return [];
    }

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const playlistData = await playlistRes.json();

    const videoIds = (playlistData.items || [])
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");

    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const detailsData = await detailsRes.json();

    return (playlistData.items || [])
      .map((item: any) => {
        const details = detailsData.items.find(
          (video: any) =>
            video.id === item.snippet.resourceId.videoId
        );

        if (!details) {
          return null;
        }

        const duration = parseDuration(
          details.contentDetails.duration
        );

        // odstráni Shorts pod 60 sekúnd
        if (duration < 60) {
          return null;
        }

        return {
          id: {
            videoId: item.snippet.resourceId.videoId,
          },
          snippet: item.snippet,
          views: details.statistics?.viewCount || "0",
        };
      })
      .filter(Boolean);

  } catch (error) {
    console.error(error);

    return [];
  }
}