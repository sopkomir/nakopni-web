const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

async function getUploadsPlaylistId() {

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
}

function parseDuration(duration: string) {

  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  const hours =
    parseInt(match?.[1] || "0");

  const minutes =
    parseInt(match?.[2] || "0");

  const seconds =
    parseInt(match?.[3] || "0");

  return (
    hours * 3600 +
    minutes * 60 +
    seconds
  );
}

export async function getLatestVideos() {

  try {

    const uploadsPlaylistId =
      await getUploadsPlaylistId();

    if (!uploadsPlaylistId) {
      return [];
    }

    let allItems: any[] = [];

    let nextPageToken = "";

    do {

      const url =
        `https://www.googleapis.com/youtube/v3/playlistItems` +
        `?part=snippet` +
        `&playlistId=${uploadsPlaylistId}` +
        `&maxResults=50` +
        `&pageToken=${nextPageToken}` +
        `&key=${API_KEY}`;

      const playlistRes = await fetch(
        url,
        {
          cache: "no-store",
        }
      );

      const playlistData =
        await playlistRes.json();

      allItems.push(
        ...(playlistData.items || [])
      );

      nextPageToken =
        playlistData.nextPageToken || "";

    } while (nextPageToken);

    const allStats: any[] = [];

    for (
      let i = 0;
      i < allItems.length;
      i += 50
    ) {

      const chunk = allItems
        .slice(i, i + 50)
        .map(
          (item: any) =>
            item?.snippet?.resourceId?.videoId
        )
        .filter(Boolean)
        .join(",");

      if (!chunk) {
        continue;
      }

      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${chunk}&key=${API_KEY}`,
        {
          cache: "no-store",
        }
      );

      const statsData =
        await statsRes.json();

      allStats.push(
        ...(statsData.items || [])
      );
    }

    return allItems
      .map((item: any) => {

        const videoId =
          item?.snippet?.resourceId?.videoId;

        if (!videoId) {
          return null;
        }

        const stats =
          allStats.find(
            (stat: any) =>
              stat.id === videoId
          );

        if (!stats) {
          return null;
        }

        const duration =
          stats?.contentDetails?.duration || "";

        const totalSeconds =
          parseDuration(duration);

        const title =
          item?.snippet?.title?.toLowerCase() || "";

        const isShort =
          totalSeconds < 90;

        const hasShortTag =
          title.includes("#shorts") ||
          title.includes("#short");

        if (isShort || hasShortTag) {
          return null;
        }

        return {

          id: {
            videoId,
          },

          snippet: item.snippet,

          views:
            stats?.statistics?.viewCount || "0",

        };
      })
      .filter(Boolean);

  } catch (error) {

    console.error(error);

    return [];
  }
}