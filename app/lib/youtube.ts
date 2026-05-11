const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

function parseDuration(duration: string) {
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);

  const minutes = parseInt(match?.[1] || "0");
  const seconds = parseInt(match?.[2] || "0");

  return minutes * 60 + seconds;
}

export async function getLatestVideos() {

  const searchRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=20&channelId=${CHANNEL_ID}&order=date`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const searchData = await searchRes.json();

  const ids = searchData.items
    .map((item: any) => item.id.videoId)
    .join(",");

  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=contentDetails,statistics&id=${ids}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  const detailsData = await detailsRes.json();

  const detailsMap = new Map();

  detailsData.items.forEach((item: any) => {

    detailsMap.set(item.id, {
      duration: parseDuration(item.contentDetails.duration),
      views: item.statistics.viewCount,
    });

  });

  const filteredVideos = searchData.items
    .filter((video: any) => {

      const details =
        detailsMap.get(video.id.videoId);

      return details?.duration > 90;

    })
    .map((video: any) => {

      const details =
        detailsMap.get(video.id.videoId);

      return {
        ...video,
        views: details?.views || "0",
      };

    });

  return filteredVideos;
}