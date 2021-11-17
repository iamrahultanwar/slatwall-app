import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Http = axios.create({
  baseURL: "https://kontent.slatwallcommerce-dev.io/index.cfm/",
  timeout: 10000,
});

Http.interceptors.request.use(async function (config) {
  try {
    config.headers["SWX-requestSiteCode"] = "sports-shop";

    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      config.headers["Auth-Token"] = `Bearer ${value}`;
    }
    return config;
  } catch (e) {
    return config;
  }
});

Http.interceptors.response.use(
  async (response) => {
    if (response.data.token) {
      await AsyncStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export const GetCategories = () => {
  return Http.get("/api/public/category/");
};

export const GetProductTypes = () => {
  return Http.get("/api/public/producttype/");
};

export const GetRelatedProducts = () => {
  return Http.get("/api/scope/getRelatedProducts");
};

export const SearchProducts = (keyword = "", currentPage = 1) => {
  return Http.get(
    `/api/scope/productSearch?keyword=${keyword}&pageSize=20&currentPage=${currentPage}`
  );
};

export const AddProductToCart = (skuId, quantity = 1) => {
  return Http.post("/api/scope/addOrderItem", {
    skuID: skuId,
    quantity,
  });
};

export const GetCart = () => {
  return Http.get("/api/scope/getCart");
};

export const GetProductDetails = (urlTitle) => {
  return Http.get(
    `/api/public/getEntity?urlTitle=${urlTitle}&entityName=product&includeAttributesMetadata=true&includeCategories=true&includeOptions=true&includeSkus=true&includeSettings=true`
  );
};

export const LoginUser = (emailAddress, password) => {
  return Http.post("/api/scope/login", {
    emailAddress,
    password,
  });
};

export const GetUser = () => {
  return Http.get("/api/scope/getAccount");
};
