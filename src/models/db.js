import { userMemStore } from "./mem/user-mem-store.js";
import { placegroupMemStore } from "./mem/placegroup-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { placegroupJsonStore } from "./json/placegroup-json-store.js";
import { placeJsonStore } from "./json/place-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placegroupMongoStore } from "./mongo/placegroup-mongo-store.js";
import { placeMongoStore } from "./mongo/place-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  placegroupStore: null,
  placeStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.placegroupStore = placegroupJsonStore;
        this.placeStore = placeJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.placegroupStore = placegroupMongoStore;
        this.placeStore = placeMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.placegroupStore = placegroupMemStore;
        this.placeStore = placeMemStore;
    }
  }
};
