import jsSHA from "jssha";
import { APP_ID, APP_Key } from "../global/test";
const API_BASE = "https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON";

const getAuthorizationHeader = () => {
  let AppID = APP_ID;
  let AppKey = APP_Key;

  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization: Authorization, "X-Date": GMTString };
};

export async function fetchData(data) {
  try {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: getAuthorizationHeader(),
      // body: JSON.stringify({ data }),
    });
    const response = await res.json();
    return response;
  } catch (reject) {
    console.log("error", reject);
  }
}

export async function getList() {
  const result = await fetchData();
  console.log("result", result);
}
