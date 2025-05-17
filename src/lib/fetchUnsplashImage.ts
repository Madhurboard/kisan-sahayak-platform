export const fetchUnsplashImage = async (query: string) => {
  const UNSPLASH_ACCESS_KEY = 'SH9g4jhjdKyCRQyxrwUZW6NPc_roRuaVR7KNA1iTRvg'; // move this to .env for production

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&orientation=landscape&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await res.json();
    return data?.results?.[0]?.urls?.regular || null;
  } catch (err) {
    console.error('Error fetching image for:', query, err);
    return null;
  }
};
