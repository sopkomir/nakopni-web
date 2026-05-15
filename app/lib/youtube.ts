const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

function parseDuration(duration: string) {

  const match = duration.match(
    /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/
  );

  const hours = parseInt(match?.[1] || "0");

  const minutes = parseInt(match?.[2] || "0");

  const seconds = parseInt(match?.[3] || "0");

  return hours * 3600 + minutes * 60 + seconds;
}

export async function getLatestVideos() {

  try {

    let allVideos: any[] = [];

    let nextPageToken = "";

    for (let i = 0; i < 5; i++) {

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=50&channelId=${CHANNEL_ID}&order=date&pageToken=${nextPageToken}`,
        {
          next: {
            revalidate: 3600,
          },
        }
      );

      const searchData = await searchRes.json();

      if (!searchData.items) {
        break;
      }

      const ids = searchData.items
      .filter((item: any) => item.id?.videoId)
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

      detailsData.items?.forEach((item: any) => {

        detailsMap.set(item.id, {
          duration: parseDuration(
            item.contentDetails.duration
          ),
          views: item.statistics.viewCount,
        });

      });

      const filteredVideos = searchData.items
      .filter((video: any) => video.id?.videoId)
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

      allVideos = [
        ...allVideos,
        ...filteredVideos,
      ];

      if (!searchData.nextPageToken) {
        break;
      }

      nextPageToken =
        searchData.nextPageToken;
    }

    return allVideos;

  } catch (error) {

    console.error(error);

    return [];

  }
}