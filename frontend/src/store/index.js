import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

export const store = createStore({
  state: {
    topLevelStatus: "awaiting-password", //awaiting-password, error, photos, loading
    token: "",
    password: "",
    photos: {},
    currentlyShowing: {
      box: false,
      group: null,
      image: null,
    },
  },
  mutations: {
    updateTopLevelStatus(state, status) {
      state.topLevelStatus = status;
    },
    setToken(state, token) {
      state.token = token;
    },
    setPassword(state, password) {
      state.password = password;
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
  },
  actions: {
    async setToken({ commit }, password) {
      commit("updateTopLevelStatus", "loading");
      try {
        const token = await axios({
          url: `/api/token`,
          method: "GET",
          headers: { Authorization: "Bearer " + password },
        });
        commit("updateTopLevelStatus", "loading");
        const photos = await axios({
          url: `/api/photos/all`,
          method: "GET",
          headers: { Authorization: "Bearer " + token.data.token },
          onDownloadProgress: (progress) => {
            console.log(progress);
          },
        });
        commit("setToken", token.data.token);
        commit("setPhotos", photos.data);
        commit("updateTopLevelStatus", "photos");
        router.push("/");
      } catch (err) {
        commit("updateTopLevelStatus", "awaiting-password");
        alert("incorrect password");
      }
    },
  },
});
