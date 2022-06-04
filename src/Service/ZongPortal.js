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
  QueueStore,
  QueueCreate,
  SystemSoundFetch,
  SystemSoundDelete,
  SystemSoundCreate,
  SystemSoundStore,
  MOHClassFetch,
  MOHClassDelete,
  MOHClassStore,
  VoiceMailFetch,
  VoiceMailStore,
  AnnouncementFetch,
  AnnouncementCreate,
  AnnouncementStore,
  AnnouncementDelete,
  AnnouncementUpdate,
  AnnouncementEdit,
  CallSettingFetch,
  CallSettingStore,


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
  
  
  CreateQueue: async (body) => {
    const url = `${BaseURL}${QueueCreate}`;
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
  StoreQueue: async (body) => {
    const url = `${BaseURL}${QueueStore}`;
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

  
  // ---------------------------------- SystemSound --------------------------------
  FetchSystemSound: async () => {
    const token = localStorage.getItem("token");

    const url = `${BaseURL}${SystemSoundFetch}`;

    const body = {
      key: "value",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    // console.log("TOKEN", token);
    return axios.post(url, body, config);
  },
  CreateSystemSound: async (body) => {
    const url = `${BaseURL}${SystemSoundCreate}`;
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
  StoreSystemSound: async (body) => {
    const url = `${BaseURL}${SystemSoundStore}`;
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

  DeleteSystemSound: async (body) => {
    const url = `${BaseURL}${SystemSoundDelete}`;
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    };
    return axios.post(url, body, config);
  },

  // EditExtension: async (body) => {
  //   const url = `${BaseURL}${ExtensionEdit}`;
  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  //   };
  //   return axios.post(url, body, config);
  // },

  // UpdateExtension: async (body) => {
  //   const url = `${BaseURL}${ExtensionUpdate}`;
  //   for (var key of body.entries()) {
  //     console.log("FormData-", key[0] + ", " + key[1]);
  //   }
  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };
  //   return axios.post(url, body, config);
  // },
// ------------------------------------------ GET MOH CLASS --------------
// GetMOHClass
FetchMOHClass: async () => {
  const token = localStorage.getItem("token");

  const url = `${BaseURL}${MOHClassFetch}`;

  const body = {
    key: "value",
  };
  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  // console.log("TOKEN", token);
  return axios.post(url, body, config);
},

DeleteMOHClass: async (body) => {
  const url = `${BaseURL}${MOHClassDelete}`;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  return axios.post(url, body, config);
},

StoreMOHCall: async (body) => {
  const url = `${BaseURL}${MOHClassStore}`;
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


// ---------------------------------------- VOICE MAIL------------------------


FetchVoiceMail: async () => {
  const token = localStorage.getItem("token");

  const url = `${BaseURL}${VoiceMailFetch}`;

  const body = {
    key: "value",
  };
  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  // console.log("TOKEN", token);
  return axios.post(url, body, config);
},

StoreVoiceMail: async (body) => {
  const url = `${BaseURL}${VoiceMailStore}`;
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


// ---------------------------------------- Announcement------------------------

FetchAnnouncement: async () => {
  const token = localStorage.getItem("token");

  const url = `${BaseURL}${AnnouncementFetch}`;

  const body = {
    key: "value",
  };
  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  // console.log("TOKEN", token);
  return axios.post(url, body, config);
},

CreateAnnouncement: async (body) => {
  const url = `${BaseURL}${AnnouncementCreate}`;
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

StoreAnnouncement: async (body) => {
  const url = `${BaseURL}${AnnouncementStore}`;
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
DeleteAnnouncement: async (body) => {
  const url = `${BaseURL}${AnnouncementDelete}`;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  return axios.post(url, body, config);
},

UpdateAnnouncement: async (body) => {
  const url = `${BaseURL}${AnnouncementUpdate}`;
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
EditAnnouncement: async (body) => {
  const url = `${BaseURL}${AnnouncementEdit}`;
  const token = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  return axios.post(url, body, config);
},
// ------------------------------ Call settings -----------------------
GetCallSetting: async () => {
  const token = localStorage.getItem("token");

  const url = `${BaseURL}${CallSettingFetch}`;

  const body = {
    key: "value",
  };
  const config = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  };
  // console.log("TOKEN", token);
  return axios.post(url, body, config);
},

StoreCallSetting: async (body) => {
  const url = `${BaseURL}${CallSettingStore}`;
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

};