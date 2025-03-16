import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPlacegroups, summerTrip } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Placegroup Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.placegroupStore.deleteAllPlacegroups();
    for (let i = 0; i < testPlacegroups.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlacegroups[i] = await db.placegroupStore.addPlacegroup(testPlacegroups[i]);
    }
  });

  test("create a placegroup", async () => {
    const placegroup = await db.placegroupStore.addPlacegroup(summerTrip);
    assertSubset(summerTrip, placegroup);
    assert.isDefined(placegroup._id);
  });

  test("delete all placegroups", async () => {
    let returnedPlacegroups = await db.placegroupStore.getAllPlacegroups();
    assert.equal(returnedPlacegroups.length, 3);
    await db.placegroupStore.deleteAllPlacegroups();
    returnedPlacegroups = await db.placegroupStore.getAllPlacegroups();
    assert.equal(returnedPlacegroups.length, 0);
  });

  test("get a placegroup - success", async () => {
    const placegroup = await db.placegroupStore.addPlacegroup(summerTrip);
    const returnedPlacegroup = await db.placegroupStore.getPlacegroupById(placegroup._id);
    assertSubset(summerTrip, placegroup);
  });

  test("delete One placegroup - success", async () => {
    const id = testPlacegroups[0]._id;
    await db.placegroupStore.deletePlacegroupById(id);
    const returnedPlacegroups = await db.placegroupStore.getAllPlacegroups();
    assert.equal(returnedPlacegroups.length, testPlacegroups.length - 1);
    const deletedPlacegroup = await db.placegroupStore.getPlacegroupById(id);
    assert.isNull(deletedPlacegroup);
  });

  test("get a placegroup - bad params", async () => {
    assert.isNull(await db.placegroupStore.getPlacegroupById(""));
    assert.isNull(await db.placegroupStore.getPlacegroupById());
  });

  test("delete One placegroup - fail", async () => {
    await db.placegroupStore.deletePlacegroupById("bad-id");
    const allPlacegroups = await db.placegroupStore.getAllPlacegroups();
    assert.equal(testPlacegroups.length, allPlacegroups.length);
  });
});
