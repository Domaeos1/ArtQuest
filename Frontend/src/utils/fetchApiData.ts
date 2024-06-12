import axios from "axios";

export const fetchClevelandApiData = () => {
  const url = "https://openaccess-api.clevelandart.org/api/artworks";
  const params = {
    skip: 10,
    limit: 20,
    fields: "title,images,creation_date,department,culture,technique,creators",
    has_image: 1,
  };

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
