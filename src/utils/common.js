import axios from "axios";
import qs from "qs";
import * as numeral from "numeral";
import { version } from "../../package.json";
import CryptoJS from "crypto-js";
import store from "../store";
import { addTodo } from "../store/slice/todo";
import { toast } from "react-toastify";
import { createBrowserHistory } from "history";
const config = require(`../configs/basic/${process.env.REACT_APP_BASIC_TYPE}.js`).defaultConfig;
const api = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const history = createBrowserHistory({ forceRefresh: true });

export const test = () => {
  const state = store.getState();
  console.log("todoList", state.todo.todolist);
  store.dispatch(addTodo({ id: new Date().getTime(), name: "123456" }));
  history.push("/wan");
};

export function Cookie(set, a, b, expireDays) {
  let isSuportLocalStorge = store.default.state.localStorageSuport;
  if (!isSuportLocalStorge) {
    var d = new Date();
    if (set === "set") {
      if (expireDays === undefined) {
        expireDays = 1;
      }
      /*        if (window.location.protocol == 'https:') {
                        secure = ";secure";
                    }*/
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    } else if (set === "remove") {
      d.setTime(d.getTime() - 1);
      b = "";
    } else {
      var arr = document.cookie.match(new RegExp("(^| )" + set + "=([^;]*)(;|$)"));
      if (arr != null) return unescape(arr[2]);
      return null;
    }

    // var path = location.pathname.split('/')[1]; // 目前根目錄下層的資料夾名稱
    if (expireDays === 0) {
      //使其瀏覽器關閉及回收COOKIE
      //  document.cookie = a + '=' + escape(b) + '; path=/' + path + '/';
      document.cookie = a + "=" + escape(b) + "; path=/";
      //  document.cookie = a + '=' + escape(b) + ';';
    } else {
      //  document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; path=/' + path + '/';
      document.cookie = a + "=" + escape(b) + "; " + "expires=" + d.toGMTString() + "; path=/";
      //  document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + ';';
    }

    // =========================================================================
    // domain 為 localhost 時在 IE 會失效，故暫時移除
    // =========================================================================
    // if (set.match(/set|remove/)) {
    //     var domain = window.location.host;
    //     if (domain.indexOf(':') > 0) {
    //         domain = domain.substring(0, domain.indexOf(':'));
    //     }
    //     document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; domain=' + domain + '; path=/' + secure;
    // }
    // document.cookie = a + '=' + escape(b) + '; ' + "expires=" + d.toGMTString() + '; domain=' + domain + '; path=/' + secure;
  } else {
    if (set === "set") {
      localStorage[a] = b;
      localStorage.setItem(a, b);
    } else if (set === "remove") {
      localStorage.removeItem(a);
    } else {
      return localStorage.getItem(set);
    }
  }
}
/**
 * 清空cookie
 */
export function removeAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (var i = keys.length; i > -1; i--) {
      Cookie("remove", keys[i]);
    }
  }
}
export function encryptByAESModeEBC(message, key) {
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.AES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  //	console.log(encrypted.ciphertext.toString())
  return encrypted.ciphertext.toString();
}
/** 數字補0
 * @param {number} num
 * @param {number} size
 */
export function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
// function base64url(source) {
//     // var CryptoJS = require('crypto-js');
//     let encodedSource
//     // Encode in classical base64
//     encodedSource = CryptoJS.enc.Base64.stringify(source);
//     // Remove padding equal characters
//     encodedSource = encodedSource.replace(/=+$/, '');

//     // Replace characters according to base64url specifications
//     encodedSource = encodedSource.replace(/\+/g, '-');
//     encodedSource = encodedSource.replace(/\//g, '_');

//     return encodedSource;
// }
export function getSelection() {
  // const key=store.default.state.cdnToken
  // const payload={
  //     iat: (new Date().getTime() / 1000),
  //     jti: key.h,
  //     iss: key.i,
  // }
  // const header = {
  //     "typ": "JWT",
  //     "alg": "HS256"
  // };
  try {
    // const jwtHeader = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(header)))
    // const jwtPayload = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)))
    let nowArr = new Date().getTime().toString().split("");
    let charsArr = getRandomChars(6).split("");
    nowArr.splice(0, 0, charsArr[0]);
    nowArr.splice(2, 0, charsArr[1]);
    nowArr.splice(6, 0, charsArr[2] + charsArr[3]);
    nowArr.splice(11, 0, charsArr[4]);
    nowArr.push(charsArr[5]);
    // const token=jwtHeader + "." + jwtPayload+'.'+base64url(CryptoJS.HmacSHA256((jwtHeader + "." + jwtPayload),key.j))
    const token = nowArr.join("");
    return token;
  } catch (error) {
    return "";
  }
}
export function getAjax(oldUrl, oldData = {}) {
  let data = { ...oldData };
  let url = oldUrl;
  data.env = config.env;
  // data.channelAccount = config.channel;
  if (!addChannel(url)) {
    return false;
  }
  data.channelAccount = addChannel(url);
  data.sId = Cookie("sid");

  // if(config.channel=='zlcai' ||config.channel=='cjcp888' ){
  let token = getSelection();
  if (url.indexOf("language") == -1) {
    data.langType = JSON.parse(Cookie("langType")).langType;
  }
  if (url.indexOf("loginJson") > 0) {
    token = getSpcTio(data.userName, data.password, data.cId);
  }
  if (url.indexOf("?") > -1) {
    url = url + "&tio=" + token;
  } else {
    url = url + "?tio=" + token;
  }
  // }
  Object.keys(data).forEach((item) => {
    if (data[item] === "" || data[item] === null || data[item] === undefined) {
      delete data[item];
    }
  });
  if (!Cookie("tid")) {
    //待測試
    data.tId = "";
  } else {
    data.tId = Cookie("tid");
  }

  data = rda(url, token, data);
  data = qs.stringify(data);
  //data = qs.stringify(data, { arrayFormat: "brackets" });
  if (url.indexOf("basicSetup/listJson") >= 0) {
    api.defaults.timeout = 7000;
  } else if (data.indexOf("m=lotInfo&key=LOT_ISSUE_INFO") >= 0) {
    api.defaults.timeout = 10000;
    // }else if(data.indexOf('m=insertOrder')> - 1 && data.indexOf('retry=1') < 0){
    //     api.defaults.timeout = 2000;
  } else {
    api.defaults.timeout = 0;
  }
  // if(config.oracle){
  //     api.defaults.withCredentials = false
  // }
  // var tryChatIndex=undefined;
  // if (url.indexOf('chatroom')>-1 && !(data&&data.notoast)) {

  //     tryChatIndex=setTimeout(() => {
  //         getchatUrl()
  //     }, 5000);
  //     // console.log(store.default);
  // }

  return api
    .post(url, data)
    .then(function (response) {
      // clearTimeout(tryChatIndex)
      response = response.data;

      if (response.resultCode == "1001") {
        createBrowserHistory.push("/noService");
        // TODO　store.default.commit("updateNoService", response.resultMap.blockIp);
        return response;
      }

      if (
        url.indexOf("checkUser/status") < 0 &&
        url.indexOf("checkin/getCheckinInfo") < 0 &&
        url.indexOf("/checkUser/withdrawalAmount") < 0 &&
        url.indexOf("alive") < 0 &&
        data.indexOf("getUserCategoryByLotteryInfo") < 0 &&
        (response.resultCode == "104" || response.resultCode == "999")
      ) {
        Cookie("remove", "tid");
        Cookie("remove", "sid");
        Cookie("remove", "isFreeAccount");
        // TODO store.default.commit("emptyUser");
        if (localStorage.getItem("isApp")) {
          // window.location = `${window.location.origin}/redirect?p=closeToLogin`
          window.location = `closeToLogin`;
        } else {
          createBrowserHistory.push("/acc");
        }

        showToast(response.msg);
      }

      // console.log(response);
      return response;
    })
    .catch(function (error) {
      if (data && data.notoast) {
        return false;
      }
      let status = `1000`;
      if (error.response && error.response.status) {
        status = error.response.status;
      }
      if (
        url.indexOf("alive") < 0 &&
        data.indexOf("m=lotInfo") < 0 &&
        data.indexOf("m=queryChannelLotteryInfo") < 0 &&
        url.indexOf("/content/queryContent") < 0 &&
        (url.indexOf("/room/list") < 0) & (url.indexOf("/chatroom") < 0)
      ) {
        if (navigator.onLine == false) {
          //请用此写法，而不是!navigator.onLine(Irene20190109)
          showToast(store.default.state.languageConfig.common_netErr);
        } else {
          if (oldData.key === "GAME_ISSUE_INFO_VN_HCM") return false; //TODO暫時
          if (status != "1000") {
            showToast(store.default.state.languageConfig.common_netErr);
          }
          return false;
        }
      } else {
        return false;
      }
    });
}

export function getImgAjax(url, formData) {
  return new Promise(function (resolve, reject) {
    formData.append("env", config.env);
    formData.append("tId", Cookie("tid"));
    formData.append("sId", Cookie("sid"));
    formData.append("channelAccount", store.default.state.channelAccount);
    if (url.indexOf("language") == -1) {
      formData.append("langType", JSON.parse(Cookie("langType")).langType);
    }
    const token = getSelection();
    if (url.indexOf("?") > -1) {
      url = url + "&tio=" + token;
    } else {
      url = url + "?tio=" + token;
    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.onload = function () {
      if (xhr.status == 200) {
        const res = JSON.parse(xhr.responseText);
        console.log(res);
        resolve(res);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(formData);
  });
}

export function addChannel(url) {
  //注册，登录一律带channel
  if (url.indexOf("memberRegister") >= 0 || url.indexOf("loginJson") >= 0 || url.indexOf("basicSetup/listJson") >= 0) {
    return store.default.state.channelAccount;
  }
  const cache = store.default.state.groupPath.cache;
  //试玩账号带 channelTestId(取得首页轮播图与捉cache的資料一律例外)
  if (Cookie("isFreeAccount") && url.indexOf("imageApi") < 0 && url.indexOf("marqueeList") < 0 && url.indexOf("INDEX_WIN_LIST") < 0 && url.indexOf(cache) < 0) {
    return `${store.default.state.channelAccount}_Test`;
  }
  return store.default.state.channelAccount;
}
export function rda(url, token, data) {
  if (url.indexOf("loginJson") > 0) {
    return dep(token, data);
  }
  if (url.indexOf("memberfunds/withdrawCheckJson") > 0) {
    return wwb(token, data);
  }
  if (url.indexOf("memberfunds/withdrawStartJson") > 0) {
    return wwb(token, data);
  }
  if (url.indexOf("memberfunds/withdrawStartJsonTest") > 0) {
    return wwb(token, data);
  }
  if (url.indexOf("memberRegister") > 0) {
    return ery(token, data);
  }
  if (url.indexOf("memberfunds/fundPass") > 0) {
    return kdw(token, data);
  }
  // if(url.indexOf('memberfunds/fundPassberRegister')>0){ return kdw(token, data)}
  if (url.indexOf("memberfunds/changeFundPass") > 0) {
    return dke(token, data);
  }
  if (url.indexOf("bankCard/addCard") > 0) {
    return wwb(token, data);
  }
  if (url.indexOf("bankCard/updateCard") > 0) {
    return wwb(token, data);
  }
  if (url.indexOf("users/changePwd") > 0) {
    return abd(token, data);
  }
  return data;
}
//随機生成長度len的隨機字串(預設隨機字串集是大小寫英數字)
export function randomString(len, charSet) {
  charSet = charSet || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var randomString = "";
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}
export function getSpcTio(un, pw, cId) {
  let tempTioList = randomString(32).split("");
  let tempIntList = randomString(7, "0123456789").split("");
  const numPosList = [2, 9, 16, 17, 24, 28, 30];
  for (let i = 0; i < numPosList.length; i++) {
    tempTioList[numPosList[i]] = tempIntList[i];
  }
  if (tempTioList[17] == "0") {
    tempTioList[17] = getRandomInt(1, 9);
  }
  //  console.log('tio2', tempTioList.join(''))

  tempTioList[parseInt(tempTioList[17]) - 1] = getRandomInt(0, 9);
  //  console.log('tio3', tempTioList.join(''))

  const un2 = un.charCodeAt(1);
  const un4 = un.charCodeAt(3);
  const unLast2 = un.substr(un.length - 2, 1).charCodeAt();
  const unLast1 = un.substr(un.length - 1, 1).charCodeAt();
  let modVal = tempTioList[28] + tempTioList[9];
  if (!parseInt(modVal)) {
    modVal = tempTioList[17];
  }
  let tempSubTio = (un2 + un4 + unLast1 + unLast2) % modVal;
  tempSubTio = pad(tempSubTio, 2);
  tempTioList[15] = tempSubTio.substr(0, 1);
  tempTioList[10] = tempSubTio.substr(1, 1);
  //  console.log('tio4',un,  tempTioList.join(''))

  const pw1 = pw.substr(0, 1).charCodeAt();
  const pwLast3 = pw.substr(pw.length - 3, 1).charCodeAt();
  modVal = tempTioList[9] + tempTioList[17];
  if (!parseInt(modVal)) {
    modVal = tempTioList[17];
  }
  tempSubTio = (pw1 * pwLast3) % modVal;
  //  console.log('bbbb', (pw1 * pwLast3), modVal, (pw1 * pwLast3) % modVal)
  tempSubTio = pad(tempSubTio, 2);
  tempTioList[22] = tempSubTio.substr(0, 1);
  // console.log('tio5',pw ,  tempTioList.join(''))

  const cId1 = cId.substr(0, 1).charCodeAt();
  const cId13 = cId.substr(12, 1).charCodeAt();
  const cId18 = cId.substr(17, 1).charCodeAt();
  const cId20 = cId.substr(19, 1).charCodeAt();
  tempSubTio = cId1 + cId13 + cId18 + cId20;
  tempSubTio = tempSubTio.toString(32);
  tempTioList[31] = tempSubTio.substr(0, 1);
  //  console.log('tio6',cId,  tempTioList.join(''))

  const ca = store.default.state.channelAccount;
  let cutNum = 5;
  if (ca.length < cutNum) {
    cutNum = cutNum % ca.length;
  }
  const ca5 = ca.substr(cutNum - 1, 1).charCodeAt();
  const caLast1 = ca.substr(ca.length - 1, 1).charCodeAt();
  modVal = tempTioList[parseInt(tempTioList[17]) - 1];
  if (!parseInt(modVal)) {
    modVal = tempTioList[17];
  }
  tempSubTio = (ca5 * caLast1) % modVal;
  tempTioList[25] = tempSubTio;
  //  console.log('tio7',ca, tempTioList.join(''))

  const env = config.env;
  const env1 = env.substr(0, 1).charCodeAt();
  const envLast1 = env.substr(env.length - 1, 1).charCodeAt();
  modVal = tempTioList[2] + tempTioList[28] + tempTioList[24] + tempTioList[9];
  if (!parseInt(modVal)) {
    modVal = tempTioList[17];
  }
  tempSubTio = (env1 * envLast1) % modVal;
  tempSubTio = tempSubTio.toString(32);
  tempTioList[12] = tempSubTio.substr(0, 1);
  tempTioList[13] = tempSubTio.substr(tempSubTio.length - 1, 1);
  // console.log('tio8',env,  tempTioList.join(''))

  const uu = store.default.state.uu;
  const uu5 = uu.substr(4, 1).charCodeAt();
  const uu6 = uu.substr(5, 1).charCodeAt();
  const uu9 = uu.substr(8, 1).charCodeAt();
  const uu26 = uu.substr(25, 1).charCodeAt();
  const uu25 = uu.substr(24, 1).charCodeAt();
  modVal = uu25 * tempTioList[9];
  if (!parseInt(modVal)) {
    modVal = tempTioList[17];
  }
  tempSubTio = (uu5 * uu6 * uu9 * uu26) % modVal;
  tempSubTio = tempSubTio.toString(16);
  tempTioList[19] = tempSubTio.substr(0, 1);
  if (tempSubTio.length == 1) {
    tempTioList[29] = "A";
  } else {
    tempTioList[29] = tempSubTio.substr(1, 1);
  }
  // console.log('tio9',uu,  tempTioList.join(''))
  if (Cookie("pId")) {
    if (tempTioList[11].charCodeAt() >= 48 && tempTioList[11].charCodeAt() <= 57) {
      tempTioList[18] = randomString(1, "0123456789");
    } else {
      tempTioList[18] = randomString(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    }
  } else {
    if (tempTioList[11].charCodeAt() >= 48 && tempTioList[11].charCodeAt() <= 57) {
      tempTioList[18] = randomString(1, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    } else {
      tempTioList[18] = randomString(1, "0123456789");
    }
  }
  // console.log('tio10',Cookie('pId'),tempTioList[11],tempTioList[18],  tempTioList.join(''))
  // console.log('==========')
  return tempTioList.join("");
}
/**
 *
 * @param {*} num 數字
 * @param {*} size 需要位數
 * @param {*} zeroIn 是否0也顯示
 * ex setNum(123456.123456,5) //0不顯示
 * ex setNum(123456.123456,5,1) //0顯示
 */
export function setNum(num, size, zeroIn) {
  function cleanZeor(val) {
    //砍字串遞回
    let nem = val.split("");
    if (nem[nem.length - 1] == "0") {
      val = val.substr(0, val.length - 1);
      val = cleanZeor(val);
    }
    return val;
  }
  if (!num && num !== 0) {
    num = "";
  }
  let setNum = num.toString().split(".");
  let setFlour = "";
  for (let i = 0; i < size; i++) {
    setFlour = setFlour + "0";
  }
  if (setNum[1] != undefined) {
    setNum[1] = setNum[1] + setFlour;
  } else {
    setNum[1] = setFlour;
  }
  if (size !== undefined) {
    setNum[1] = setNum[1].substring(0, size);
    if (zeroIn) {
      return setNum.join(".");
    } else {
      let newSet = cleanZeor(setNum[1]); //去除尾數0
      if (newSet != "") {
        setNum[1] = newSet;
      } else {
        setNum = [setNum[0]];
      }
      return setNum.join(".");
    }
  } else {
    return num.toString();
  }
}
//增加千分位
export function setNumLocal(num) {
  let setNum = num.toString().split(".");
  // setNum[0] = parseInt(setNum[0]).toLocaleString();
  setNum[0] = numeral(setNum[0]).format("0,0");
  let temp = setNum.join(".");
  if (num < 0 && setNum[0] == 0) return "-" + temp;
  else return temp;
}

/**
 * 精确乘法
 */
export function times(num1, num2) {
  const num1Changed = Number(num1.toString().replace(".", ""));
  const num2Changed = Number(num2.toString().replace(".", ""));
  const baseNum = digitLength(num1) + digitLength(num2);
  return (num1Changed * num2Changed) / Math.pow(10, baseNum);
}

/**
 * 精确加法
 */
export function plus(num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 精确减法
 */
export function minus(num1, num2) {
  const baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 精确除法
 */
export function divide(num1, num2) {
  const num1Changed = Number(num1.toString().replace(".", ""));
  const num2Changed = Number(num2.toString().replace(".", ""));
  return times(num1Changed / num2Changed, Math.pow(10, digitLength(num2) - digitLength(num1)));
}

export function digitLength(num) {
  // Get digit length of e
  const eSplit = num.toString().split(/[eE]/);
  const len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

// //註冊
// export function initRegister() {
//     var data = {
//         columnType: memberConfig,
//     }
//     return getAjax(this.$store.state.groupPath.platformM + 'loginJson/simple', data)
//         .then(function(response) {
//             console.log(response);

//         })

// }

export function dep(t, d) {
  const m = d.userName + "_" + d.password;
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  const a = encryptByAESModeEBC(m, st);
  let dd = { ...d };
  dd.userName = a;
  dd.password = a;
  return dd;
}

export function ery(t, d) {
  let isFundPasswordExist = d.fundPassword ? d.fundPassword : "";
  let isConfirmPasswordExist = d.confirmPassword ? d.confirmPassword : "";
  const m = `${d.userName}_${d.password}_${isConfirmPasswordExist}_${isFundPasswordExist}`;
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  const a = encryptByAESModeEBC(m, st);
  // console.log('st', st, 'a', a)
  let dd = { ...d };
  dd.userName = a;
  dd.password = a;
  dd.confirmPassword = a;
  return dd;
}
export function kdw(t, d) {
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  let dd = { ...d };
  dd.fundPassword = encryptByAESModeEBC(dd.fundPassword, st);
  dd.confirmFundPassword = encryptByAESModeEBC(dd.confirmFundPassword, st);
  return dd;
}
export function dke(t, d) {
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  let dd = { ...d };
  dd.confirmFundPassword = encryptByAESModeEBC(dd.confirmFundPassword, st);
  dd.fundPassword = encryptByAESModeEBC(dd.fundPassword, st);
  dd.confirmPassword = encryptByAESModeEBC(dd.confirmPassword, st);
  return dd;
}
export function wwb(t, d) {
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  let dd = { ...d };
  dd.fundPassword = encryptByAESModeEBC(dd.fundPassword, st);
  return dd;
}
export function abd(t, d) {
  const st = t.substring(5, 7) + t.substring(9, 16) + t.substring(1, 5) + t.substring(10, 13);
  let dd = { ...d };
  dd.oldPwd = encryptByAESModeEBC(dd.oldPwd, st);
  dd.newPwd = encryptByAESModeEBC(dd.newPwd, st);
  dd.confirmNewPwd = encryptByAESModeEBC(dd.confirmNewPwd, st);
  return dd;
}

//正式LOGIN
export function formalLogin(userName, password, captcha, cid, apiUrl) {
  let data = {
    userName: userName,
    password: password,
    captcha: captcha,
    cId: cid,
    deviceInfo: navigator.userAgent.substr(0, 495) + "/@V:" + version,
    loginUrl: window.location.origin,
  };

  Cookie("remove", "tid");
  Cookie("remove", "sid");
  Cookie("remove", "isFreeAccount");
  return getAjax(apiUrl + "/loginJson/complex", data)
    .then(function (response) {
      if (response.resultCode === "000" || response.resultCode === "021") {
        console.log(response.resultMap.token, response.resultMap.sId, "response");
        Cookie("set", "tid", response.resultMap.token);
        Cookie("set", "sid", response.resultMap.sId);
        Cookie("set", "userName", response.resultMap.userName, 30);
      }
      return response;
    })
    .catch(() => {
      // console.log(error);
    });
}

export function setTimeFormate() {
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
  };
  Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };
  Date.prototype.addSeconds = function (s) {
    this.setTime(this.getTime() + s * 1000);
    return this;
  };
}

//转换时间格式---------------------
export function transDate(date1) {
  let newTimeStamp = date1 + store.default.state.timeResetNum;
  var date = new Date(newTimeStamp);
  // var date = new Date(date1);
  var dd = "";
  var month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  var day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  var hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  var min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var Sec = date.getSeconds();
  if (Sec < 10) {
    Sec = "0" + Sec;
  }
  dd = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + Sec; //+":"+date.getSeconds();
  return dd;
}

/**
 * 計算 dfMenu 的 ID
 * @param {*} data
 * @param {*} key
 */
export function findKey(data, key) {
  if (!data) {
    return false;
  }
  return data.findIndex((obj) => {
    if (obj.lower) {
      const fndIndexResult = findKey(obj.lower, key);
      return fndIndexResult === -1 ? false : true;
    }
    return obj.id === key;
  });
}

//从 arr阵列中，取出size为一组的组合方式
export function groupSplit(arr, size) {
  var r = []; //result

  function _(t, a, n) {
    //tempArr, arr, num
    if (n === 0) {
      r[r.length] = t;
      return;
    }
    for (var i = 0, l = a.length - n; i <= l; i++) {
      var b = t.slice();
      b.push(a[i]);
      _(b, a.slice(i + 1), n - 1);
    }
  }
  _([], arr, size);
  return r;
}
//將陣列中的值補0取兩位
export function format2Digit(arr) {
  var fArr = [];
  arr.forEach(function (value, i) {
    fArr[i] = ("0" + value).slice(-2);
  });
  return fArr;
}
//sort用
export function sortNumber(a, b) {
  return a - b;
}

export function formatStr2Digit(value) {
  return ("0" + value).slice(-2);
}

//取得min到max之间的随机整数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//取得长度为len的随机字符(a-z)(故意随机不出现m)
export function getRandomChars(len = 6) {
  const chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  // debugger
  var res = "";
  for (var i = 0; i < len; i++) {
    var id = getRandomInt(0, chars.length - 1);
    res = res + chars[id];
  }
  return res;
}
export function evil(str) {
  var fn = Function;
  return new fn("return " + str)();
}

export function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
export function sortObjByKey(Obj) {
  let tempObj = {};
  Object.keys(Obj)
    .sort()
    .forEach(function (key) {
      tempObj[key] = Obj[key];
    });
  return tempObj;
}

export function getDomainTypeIdx(urlArr, domainType) {
  let comIdx = urlArr.indexOf(domainType);
  if (comIdx < 0) {
    urlArr.forEach((item, i) => {
      if (item.indexOf(`${domainType}:`) >= 0) {
        comIdx = i;
      }
    });
  }
  return comIdx;
}

//decodeBase64
export function decodeBase64(text) {
  const content = CryptoJS.enc.Base64.parse(text);
  return content.toString(CryptoJS.enc.Utf8);
}

export function getHoursAndMin(timeStamp) {
  const date = new Date(timeStamp);
  return `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}`;
}

export function encodeMd5(text) {
  return CryptoJS.MD5(text).toString();
}
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //構造一個含有目標參數的正則表達式對象
  var r = window.location.search.substr(1).match(reg); //匹配目標參數
  if (r != null) return unescape(r[2]);
  return null; //返回參數值
}

export function showToast(msg, type = "success") {
  if (msg) {
    type === "error" && toast.error(msg);
    type === "success" && toast.success(msg);
  }
}
