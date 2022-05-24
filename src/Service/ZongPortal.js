import {
  BaseURL,
  ExtensionFetch,
  ExtensionStore,
  ExtensionDelete,
  ExtensionEdit,
  ExtensionUpdate,
  IVRFetch,
  IVRDelete,
} from "../Constants";
import axios from "axios";
const token = "40|8NbmdhKMp87kxOB1rHDRzHX2jtWjnpahKVnGI7MY";

export const ZongPortal = {
  FetchExtension: async () => {
    const url = `${BaseURL}${ExtensionFetch}`;
    // const token= '33|iW59KjBS6nBAF99M3WkoO7hTmIRO3rnNKBda83Nu'
    const body = {
      key: "value",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  StoreExtension: async (body) => {
    const url = `${BaseURL}${ExtensionStore}`;
    for (var key of body.entries()) {
      console.log("FormData-", key[0] + ", " + key[1]);
    }

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

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  EditExtension: async (body) => {
    const url = `${BaseURL}${ExtensionEdit}`;

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  UpdateExtension: async (body) => {
    const url = `${BaseURL}${ExtensionStore}`;
    for (var key of body.entries()) {
      console.log("FormData-", key[0] + ", " + key[1]);
    }

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
    // const token= '33|iW59KjBS6nBAF99M3WkoO7hTmIRO3rnNKBda83Nu'
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

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },
};
