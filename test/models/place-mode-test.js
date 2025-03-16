import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacegroups, testPlaces, winterTrip, summerTrip, beachKerry, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Place Model tests", () => {
  let winterTripList = null;

  setup(async () => {
    await db.init("mongo");
    await db.placegroupStore.deleteAllPlacegroups();
    await db.placeStore.deleteAllPlaces();
    winterTripList = await db.placegroupStore.addPlacegroup(winterTrip);
    for (let i = 0; i < testPlaces.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaces[i] = await db.placeStore.addPlace(winterTripList._id, testPlaces[i]);
    }
  });

  test("create single place", async () => {
    const summerTripList = await db.placegroupStore.addPlacegroup(summerTrip);
    const place = await db.placeStore.addPlace(summerTripList._id, beachKerry);
    assert.isNotNull(place._id);
    assertSubset(beachKerry, place);
  });

  test("create multiple placeApi", async () => {
    const places = await db.placegroupStore.getPlacegroupById(winterTripList._id);
    assert.equal(testPlaces.length, testPlaces.length);
  });

  test("delete all placeApi", async () => {
    const places = await db.placeStore.getAllPlaces();
    assert.equal(testPlaces.length, places.length);
    await db.placeStore.deleteAllPlaces();
    const newPlaces = await db.placeStore.getAllPlaces();
    assert.equal(0, newPlaces.length);
  });

  test("get a place - success", async () => {
    const summerTripList = await db.placegroupStore.addPlacegroup(summerTrip);
    const place = await db.placeStore.addPlace(summerTripList._id, beachKerry);
    const newPlace = await db.placeStore.getPlaceById(place._id);
    assertSubset(beachKerry, newPlace);
  });

  test("delete One place - success", async () => {
    const id = testPlaces[0]._id;
    await db.placeStore.deletePlace(id);
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacegroups.length - 1);
    const deletedPlace = await db.placeStore.getPlaceById(id);
    assert.isNull(deletedPlace);
  });

  test("get a placegroup - bad params", async () => {
    assert.isNull(await db.placeStore.getPlaceById(""));
    assert.isNull(await db.placeStore.getPlaceById());
  });

  test("delete One User - fail", async () => {
    await db.placeStore.deletePlace("bad-id");
    const places = await db.placeStore.getAllPlaces();
    assert.equal(places.length, testPlacegroups.length);
  });
});
