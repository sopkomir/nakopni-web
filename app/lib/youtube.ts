const API_KEY = process.env.YOUTUBE_API_KEY;

const CHANNEL_ID = "UCVOUBbjW-Mp0jAzamXzP7Jg";

export async function getLatestVideos() {

  try {

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&maxResults=12&channelId=${CHANNEL_ID}&order=date`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    const data = await res.json();
    console.log(data);

    return (data.items || []).map((video: any) => ({
      ...video,
      views: "0",
    }));

  } catch (error) {

    console.error(error);

    return [];

  }
}