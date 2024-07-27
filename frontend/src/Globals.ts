export const API_DEV_URL = "http://localhost:8080/";
export const API_PROD_URL = "http://localhost:8080/";

export const API_URL =
  process.env.NODE_ENV === "production" ? API_PROD_URL : API_DEV_URL;
