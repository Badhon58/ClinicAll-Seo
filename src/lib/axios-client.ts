import { EndPoint, JsonHeader } from "@/api/config";
import axios from "axios";
import { getCookiesToken, getToken } from "./authHandler";
import http from "http";
import https from "https";

const { DEFAULT_URL } = EndPoint;

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100, // increase if needed
});

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,
});

export const axiosClient = axios.create({
  timeout: 15000,
  httpAgent,
  httpsAgent,
});

export const apiCall = async (
  method: any,
  urlEndPoint: string,
  data?: any,
  headers?: any
) => {
  let header: any = headers || JsonHeader;
  const token = await getToken();
  const cookietoken = await getCookiesToken();
  header.Authorization = `Bearer ${token || cookietoken}`;
  switch (method) {
    case "POST":
      return await axiosClient
        .post(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response: any) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "GET":
      return await axiosClient
        .get(`${DEFAULT_URL}/${urlEndPoint}`, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "PUT":
      return await axiosClient
        .put(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "PATCH":
      return await axiosClient
        .patch(`${DEFAULT_URL}/${urlEndPoint}`, data, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    case "DELETE":
      return await axiosClient
        .delete(`${DEFAULT_URL}/${urlEndPoint}`, {
          headers: header,
        })
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      break;
    default:
      break;
  }
};
