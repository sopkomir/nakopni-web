const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

async function getUploadsPlaylistId() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
    {
      next: {
        revalidate: 86400,
      },
    }
  );

  const data = await res.json();

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
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

    const filteredItems = (playlistData.items || []).filter(
      (item: any) => {
        const title = item.snippet.title.toLowerCase();

        return (
          !title.includes("#shorts") &&
          !title.includes("#short") &&
          item.snippet.thumbnails?.high?.height > item.snippet.thumbnails?.high?.width
            ? false
            : true
        );
      }
    );

    const videoIds = filteredItems
      .map((item: any) => item.snippet.resourceId.videoId)
      .join(",");

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds}&key=${API_KEY}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const statsData = await statsRes.json();

    return filteredItems
    .map((item: any) => {
      const stats = statsData.items.find(
        (stat: any) => stat.id === item.snippet.resourceId.videoId
      );

      if (!stats) {
        return null;
      }

      const duration = stats.contentDetails?.duration || "";

      const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);

      const minutes = parseInt(match?.[1] || "0");
      const seconds = parseInt(match?.[2] || "0");

      const totalSeconds = minutes * 60 + seconds;

      if (totalSeconds < 61) {
        return null;
      }

      return {
        id: {
          videoId: item.snippet.resourceId.videoId,
        },
        snippet: item.snippet,
        views: stats.statistics?.viewCount || "0",
      };
    })
    .filter(Boolean);
      const stats = statsData.items.find(
        (stat: any) => stat.id === item.snippet.resourceId.videoId
      );

      return {
        id: {
          videoId: item.snippet.resourceId.videoId,
        },
        snippet: item.snippet,
        views: stats?.statistics?.viewCount || "0",
      };
    });

  } catch (error) {
    console.error(error);

    return [];
  }
}