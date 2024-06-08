import { SIkey } from "./API_CONSTANTS";
import axios from "axios";

const SIclient = axios.create({
  baseURL:
    "https://api.si.edu/openaccess/api/v1.0/category/art_design/search?q=",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + SIkey,
  },
});

export async function searchForPieces(query: string) {
  try {
    const result = await SIclient.get(query + "&rows=2&api_key=" + SIkey);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
