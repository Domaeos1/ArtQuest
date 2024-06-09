interface Exhibition {
  name: string;
  path: string;
  description: string;
}

export const getExhibitionsFromLocalStorage = (): Exhibition[] => {
  const storedExhibitions = localStorage.getItem("exhibitions");
  return storedExhibitions ? JSON.parse(storedExhibitions) : [];
};

export const setExhibitionsToLocalStorage = (
  exhibitions: Exhibition[]
): void => {
  localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
};

export const clearExhibitionsFromLocalStorage = () => {
  localStorage.removeItem("exhibitions");
};
