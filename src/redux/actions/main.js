import common_axios from "../../utils/axios";
import {
  IS_USER, SET_COMMODITIES, USER_DATA,
} from "./types";
import * as Location from "expo-location";

export const setIsUser = (val) => ({
  type: IS_USER,
  data: val,
});

export const setUserData = (val) => ({
  type: USER_DATA,
  data: val,
});

export const setCommodities = (val) => ({
  type: SET_COMMODITIES,
  data: val,
});

export const getCommodities = () => async (dispatch) => {
  try {
    const { data } = await common_axios.get('/category')
    if (data.data) {
      dispatch({ type: SET_COMMODITIES, data: data.data })
    }
  } catch (e) {
    console.log(e)
  }
}

export const getLocation = () => async (dispatch) => {
  let { status: permission } =
    await Location.requestForegroundPermissionsAsync();
  if (permission !== "granted") {
    dispatch(setLocationDenied(true));
    return;
  }
  await Location.enableNetworkProviderAsync()
    .then()
    .catch((_) => null);
  const status = await Location.hasServicesEnabledAsync();
  if (status) {
    const getCurrentPosition = async () =>
      await Location.getCurrentPositionAsync()
        .then((loc) => loc)
        .catch((_) => null);
    let location = await getCurrentPosition();
    while (location === null) {
      location = await getCurrentPosition();
    }
    return location;
  } else {
    throw new Error("Please activate the location");
  }
};