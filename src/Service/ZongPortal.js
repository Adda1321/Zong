import {
  BaseURL,
  GetLogin,
  ExtensionFetch,
  ExtensionStore,
  ExtensionDelete,
  ExtensionEdit,
  ExtensionUpdate,
  IVRFetch,
  IVRCreate,
  IVRStore,
  IVRDelete,
  QueueFetch,
  QueueDelete,
} from "../Constants";
import axios from "axios";

// const token = "40|8NbmdhKMp87kxOB1rHDRzHX2jtWjnpahKVnGI7MY";

export const ZongPortal = {
  //---------------------------------------LogIN----------------------------------

  Login: async (body) => {
    const url = `${BaseURL}${GetLogin}`;

    const config = {
      headers: { Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  // ---------------------------------- Extension --------------------------------
  FetchExtension: async () => {
    const token = localStorage.getItem("token");

    const url = `${BaseURL}${ExtensionFetch}`;

    const body = {
      key: "value",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    console.log("TOKEN", token);
    return axios.post(url, body, config);
  },

  StoreExtension: async (body) => {
    const url = `${BaseURL}${ExtensionStore}`;
    for (var key of body.entries()) {
      console.log("FormData-", key[0] + ", " + key[1]);
    }
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, body, config);
  },

  DeleteExtension: async (body) => {
    const url = `${BaseURL}${ExtensionDelete}`;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  EditExtension: async (body) => {
    const url = `${BaseURL}${ExtensionEdit}`;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  UpdateExtension: async (body) => {
    const url = `${BaseURL}${ExtensionUpdate}`;
    for (var key of body.entries()) {
      console.log("FormData-", key[0] + ", " + key[1]);
    }
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, body, config);
  },
  // ------------------------------- IVR --------------------------------
  FetchIVR: async () => {
    const url = `${BaseURL}${IVRFetch}`;
    const token = localStorage.getItem("token");

    const body = {
      key: "value",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  DeleteIvr: async (body) => {
    const url = `${BaseURL}${IVRDelete}`;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },
  CreateIVR: async (body) => {
    const url = `${BaseURL}${IVRCreate}`;
    const token = localStorage.getItem("token");

    // for (var key of body.entries()) {
    //   console.log("FormData-", key[0] + ", " + key[1]);
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, body, config);
  },
  StoreIVR: async (body) => {
    const url = `${BaseURL}${ExtensionStore}`;
    const token = localStorage.getItem("token");

    // for (var key of body.entries()) {
    //   console.log("FormData-", key[0] + ", " + key[1]);
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, body, config);
  },
  // ------------------------------- QUEUE --------------------------------
  FetchQueue: async () => {
    const url = `${BaseURL}${QueueFetch}`;
    const token = localStorage.getItem("token");

    // const token= '33|iW59KjBS6nBAF99M3WkoO7hTmIRO3rnNKBda83Nu'
    const body = {
      key: "value",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  DeleteQueue: async (body) => {
    const token = localStorage.getItem("token");

    const url = `${BaseURL}${QueueDelete}`;

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },
};
