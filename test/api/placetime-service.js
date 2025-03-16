import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const placetimeService = {
  placetimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.placetimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.placetimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.placetimeUrl}/api/users`);
    return res.data;
  },

  async createPlacegroup(placegroup) {
    const res = await axios.post(`${this.placetimeUrl}/api/placegroups`, placegroup);
    return res.data;
  },

  async deleteAllPlacegroups() {
    const response = await axios.delete(`${this.placetimeUrl}/api/placegroups`);
    return response.data;
  },

  async deletePlacegroup(id) {
    const response = await axios.delete(`${this.placetimeUrl}/api/placegroups/${id}`);
    return response;
  },

  async getAllPlacegroups() {
    const res = await axios.get(`${this.placetimeUrl}/api/placegroups`);
    return res.data;
  },

  async getPlacegroup(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/placegroups/${id}`);
    return res.data;
  },

  async getAllPlaces() {
    const res = await axios.get(`${this.placetimeUrl}/api/places`);
    return res.data;
  },

  async createPlace(id, place) {
    const res = await axios.post(`${this.placetimeUrl}/api/placegroups/${id}/places`, place);
    return res.data;
  },

  async deleteAllPlaces() {
    const res = await axios.delete(`${this.placetimeUrl}/api/places`);
    return res.data;
  },

  async getPlace(id) {
    const res = await axios.get(`${this.placetimeUrl}/api/places/${id}`);
    return res.data;
  },

  async deletePlace(id) {
    const res = await axios.delete(`${this.placetimeUrl}/api/places/${id}`);
    return res.data;
  },
};
