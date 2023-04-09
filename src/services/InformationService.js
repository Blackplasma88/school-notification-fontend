import axios from "axios";

const api_endpoint = "http://127.0.0.1:8080";

export default {
  async getAllInfo() {
    let url = `${api_endpoint}/information/all`;
    // let header = AuthService.getApiHeader();
    let res = await axios.get(url);
    return res.data;
  },

  async getInfoById(id) {
    let url = `${api_endpoint}/information/id?${id}`;
    // let header = AuthService.getApiHeader();
    let res = await axios.get(url);
    return res.data;
  },

  async createInfo(info) {
    let url = `${api_endpoint}/information/create`;
    // let header = AuthService.getApiHeader();
    let res = await axios.post(url, info);
    return res.data;
  },

  async updateInfo(info) {
    let url = `${api_endpoint}/information/update`;
    // let header = AuthService.getApiHeader();
    let res = await axios.put(url, info);
    return res.data;
  },
};
