import { userApi } from "./api/user-api.js";
import { placegroupApi } from "./api/placegroup-api.js";
import { placeApi } from "./api/place-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/placegroups", config: placegroupApi.create },
  { method: "DELETE", path: "/api/placegroups", config: placegroupApi.deleteAll },
  { method: "GET", path: "/api/placegroups", config: placegroupApi.find },
  { method: "GET", path: "/api/placegroups/{id}", config: placegroupApi.findOne },
  { method: "DELETE", path: "/api/placegroups/{id}", config: placegroupApi.deleteOne },

  { method: "GET", path: "/api/places", config: placeApi.find },
  { method: "GET", path: "/api/places/{id}", config: placeApi.findOne },
  { method: "POST", path: "/api/placegroups/{id}/places", config: placeApi.create },
  { method: "DELETE", path: "/api/places", config: placeApi.deleteAll },
  { method: "DELETE", path: "/api/places/{id}", config: placeApi.deleteOne },
];
