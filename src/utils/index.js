import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isAuthenticated = async () => {
  try {
    let token = await AsyncStorage.getItem("token");
    if (token) {
      token = jwt_decode(token);
      return (
        token.exp && token.exp * 1000 > Date.now() && token.accountID.length > 0
      );
    }
  } catch (error) {
    console.log(error);
  }

  return false;
};

export const Constants = {
  dollar: "$",
};
