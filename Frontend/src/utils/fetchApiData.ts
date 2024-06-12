export const fetchMetMuseumArt = async () => {
  const data = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=&hasImages=true`
  );
  return data.json();
};

export const fetchMetMuseumArtById = async (id: string) => {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );
  if (response.ok) return response.json();
  throw new Error(`Failed to fetch object with ID ${id}`);
};
