import axios from "axios";

export default {

  //  FETCH ALL CUSTOMERS
  async fetchCustomerList({ commit }) {
    return await axios({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/users",
      })
        .then(res => {
          if (Array.isArray(res.data))
            commit("setCustomerList", res.data);
          else commit("setCustomerList", []);
          return res;
        })
        .catch(err => err);
  },

  // FETCH PHOTOS
  async fetchPhotoList({ commit }) {
    return await axios({
        method: "GET",
        url: "http://jsonplaceholder.typicode.com/albums/1/photos",
      })
        .then(res => {
          if (Array.isArray(res.data))
            commit("setPhotoList", res.data);
          else commit("setPhotoList", []);
          return res;
        })
        .catch(err => err);
  },
}