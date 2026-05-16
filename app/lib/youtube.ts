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

    const filteredItems = allItems.filter(
      (item: any) => {

        const title =
          item.snippet.title.toLowerCase();

        return (
          !title.includes("#shorts") &&
          !title.includes("#short")
        );
      }
    );

    const allStats: any[] = [];

    for (
      let i = 0;
      i < filteredItems.length;
      i += 50
    ) {

      const chunk = filteredItems
        .slice(i, i + 50)
        .map(
          (item: any) =>
            item.snippet.resourceId.videoId
        )
        .join(",");

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

    console.log("FILTERED VIDEOS:", filteredItems.length);
    console.log("ALL ITEMS:", allItems.length);
    return filteredItems
      .map((item: any) => {

        const stats =
          allStats.find(
            (stat: any) =>
              stat.id ===
              item.snippet.resourceId.videoId
          );

        if (!stats) {
          return null;
        }

        const duration =
          stats.contentDetails?.duration || "";

        const match = duration.match(
          /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
        );

        const hours =
          parseInt(match?.[1] || "0");

        const minutes =
          parseInt(match?.[2] || "0");

        const seconds =
          parseInt(match?.[3] || "0");

        const totalSeconds =
          hours * 3600 +
          minutes * 60 +
          seconds;

        if (totalSeconds < 61) {
          return null;
        }

        return {

          id: {
            videoId:
              item.snippet.resourceId.videoId,
          },

          snippet: item.snippet,

          views:
            stats.statistics?.viewCount || "0",

          duration: totalSeconds,
        };
      })
      .filter(Boolean);

  } catch (error) {

    console.error(error);

    return [];
  }
}