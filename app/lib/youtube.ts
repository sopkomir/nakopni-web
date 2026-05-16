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

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&key=${API_KEY}`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const data = await res.json();

    return (data.items || []).map((item: any) => ({
      id: {
        videoId: item.snippet.resourceId.videoId,
      },
      snippet: item.snippet,
      views: "0",
    }));

  } catch (error) {
    console.error(error);

    return [];
  }
}