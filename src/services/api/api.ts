import axios from "axios";
import { getStoredData } from "../storage/storage";
import { errorToast, successToast } from "../toast/toast";
import { apiUrl } from "./serverUrl";

class ApiService {
  private services: any = {
    register: {
      url: "/register",
      type: "POST",
    },
    login: {
      url: "/login",
      type: "POST",
    },
    createProperty: {
      url: "/property",
      type: "POST",
    },
    createUnit: {
      url: "/unit",
      type: "POST",
    },
    getProperty: {
      url: "/property",
      type: "GET",
    },
    updateProperty: {
      url: "/property/{id}",
      type: "PATCH",
    },
    getUnits: {
      url: "/unit",
      type: "GET",
    },
    sendMsg: {
      url: "/chat",
      type: "POST",
    },
    getChat: {
      url: "/chat",
      type: "GET",
    },
    addMaintenance: {
      url: "/maintenance",
      type: "POST",
    },
    getMaintenance: {
      url: "/maintenance",
      type: "GET",
    },
  };
  async send(serviceName: any, options: any): Promise<any> {
    const service = { ...this.services[serviceName] };
    let afterReplace: string;
    let v: any;
    let hideMessage: false;
    afterReplace = "";
    for (const option of Object.keys(options)) {
      option === "hideMsg"
        ? (hideMessage = options[option])
        : (v = options[option]);
      afterReplace = service.url.replace(new RegExp(`{${option}}`, "m"), v);
      if (service.url !== afterReplace) {
        delete options[option];
        service.url = afterReplace;
      }
    }
    const ss = this.get(service);
    const headers: any = {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    };
    const lang = localStorage.getItem("i18nextLng") || null;
    if (lang) {
      headers["accept-language"] = lang;
    }
    const token = getStoredData("authenticationToken");
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }

    return axios
      .request({
        baseURL: ss.url,
        method: ss.type,
        headers,
        data: ss.type !== "GET" ? options : {},
        params: ss.type === "GET" ? { ...options, lang } : { lang },
      })
      .then((data) => {
        if (
          data &&
          data.data &&
          data.data.msg &&
          ![true, false].includes(data.data.exist)
        ) {
          if (!hideMessage) {
            console.log(data.data);
            successToast(data.data.msg);
          }
        }
        return data;
      })
      .catch((error) => {
        if (error) {
          if (error.message === "Network Error" && !error.response) {
            console.error("Network Error1");
            errorToast(error.message);
            return Promise.reject(error.message);
          } else if (error.response) {
            console.error("response error2", error.response);
            errorToast(error.response.data.feedback.ar);
            return Promise.reject(error.response);
          } else if (error.request) {
            console.error("request error3", error.request);
            return Promise.reject(error.message);
          }
        }
      });
  }

  private get(service: { url: string; type: any }) {
    return { url: apiUrl + service.url, type: service.type };
  }
}

export default new ApiService();
