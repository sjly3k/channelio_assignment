import axios from "axios";

export const getCountries = async () => {
  return await axios.get("https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes");
};
