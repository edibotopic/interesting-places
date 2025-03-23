import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { placegroupController as placeGroupController } from "./controllers/placegroup-controller.js";
import { placeController } from "./controllers/place-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addplacegroup", config: dashboardController.addPlacegroup },
  { method: "GET", path: "/dashboard/deleteplacegroup/{id}", config: dashboardController.deletePlacegroup },

  { method: "GET", path: "/placegroup/{id}", config: placeGroupController.index },
  { method: "POST", path: "/placegroup/{id}/addplace", config: placeGroupController.addPlace },
  { method: "GET", path: "/placegroup/{id}/deleteplace/{placeid}", config: placeGroupController.deletePlace },

  { method: "GET", path: "/place/{id}/editplace/{placeid}", config: placeController.index },
  { method: "POST", path: "/place/{id}/updateplace/{placeid}", config: placeController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
  { method: "GET", path: "/leaflet/{param*}", handler: { directory: { path: "node_modules/leaflet/dist", listing: false, index: false } }, options: { auth: false } },
  { method: "GET", path: "/leaflet-fullscreen/{param*}", handler: { directory: { path: "node_modules/leaflet-fullscreen/dist", listing: false, index: false } }, options: { auth: false } }
];
