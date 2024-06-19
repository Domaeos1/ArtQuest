interface SingleArtwork {
  id: number;
  title: string;
  description: string;
  artist: string;
  origin: string;
  department: string;
  url: string;
  image_src: string;
  created_at: string;
}

export const getCollectionsFromLocalStorage = (): SingleArtwork[] => {
  // localStorage.removeItem("collections");

  const storedCollections = localStorage.getItem("collections");
  return storedCollections ? JSON.parse(storedCollections) : [];
};

export const setCollectionsToLocalStorage = (collections: SingleArtwork[]) => {
  localStorage.setItem("collections", JSON.stringify(collections));
};

export const clearExhibitionsFromLocalStorage = () => {};
