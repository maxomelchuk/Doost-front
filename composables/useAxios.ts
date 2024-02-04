import axios from "axios";
import requestHeaders, { getAppEnvHost } from "~/app/functions";

export const useAxios = () => {
  return axios.create({
    baseURL: getAppEnvHost(),
    headers: requestHeaders(),
  });
};
