import axios from "axios";

export const fetchClevelandApiData = (
  page: number,
  query?: string,
  filter?: string,
  sort?: string
) => {
  const url = "https://openaccess-api.clevelandart.org/api/artworks";
  const limit = 12;
  const params: { [key: string]: any } = {
    skip: 8 + (page - 1) * limit, // Calculate skip based on page number
    limit: limit,
    // fields: "title,images,creation_date,department,culture,technique,creators",
    has_image: 1,
  };

  if (query || filter || sort) {
    params["q"] = query;
    params["department"] = filter;
    // params["sort"] = sort;
  }

  return axios.get(url, { params });
};

// Call the function to print the results

// .then((resp) => {
//   for (const artwork of resp.data.data) {
//     const title = artwork.title;
//     const creationDate = artwork.creation_date;
//     const department = artwork.department;
//     const culture = artwork.culture;
//     const technique = artwork.technique;
//     const creators = artwork.creators
//       .map((creator) => creator.description)
//       .join(", ");
//     const imageUrl = artwork.images.web.url;

//     console.log(`Title: ${title}`);
//     console.log(`Creation Date: ${creationDate}`);
//     console.log(`Department: ${department}`);
//     console.log(`Culture: ${culture}`);
//     console.log(`Technique: ${technique}`);
//     console.log(`Creators: ${creators}`);
//     console.log(`Image URL: ${imageUrl}\n---`);
//   }
// })
// .catch((e) => {
//   console.log("ERROR getting artwork data");
//   console.log(e);
