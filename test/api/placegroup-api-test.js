import { EventEmitter } from "events";
import { assert } from "chai";
import { placetimeService } from "./placetime-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, summerTrip, testPlacegroups } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Placegrup API tests", () => {
  let user = null;

  setup(async () => {
    await placetimeService.deleteAllPlacegroups();
    await placetimeService.deleteAllUsers();
    user = await placetimeService.createUser(maggie);
    summerTrip.userid = user._id;
  });

  teardown(async () => { });

  test("create placegroup", async () => {
    const returnedPlacegroup = await placetimeService.createPlacegroup(summerTrip);
    assert.isNotNull(returnedPlacegroup);
    assertSubset(summerTrip, returnedPlacegroup);
  });

  test("delete a placegroup", async () => {
    const placegroup = await placetimeService.createPlacegroup(summerTrip);
    const response = await placetimeService.deletePlacegroup(placegroup._id);
    assert.equal(response.status, 204);
    try {
      const returnedPlacegroup = await placetimeService.getPlacegroup(placegroup.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placegroup with this id", "Incorrect Response Message");
    }
  });

  test("create multiple placegroups", async () => {
    for (let i = 0; i < testPlacegroups.length; i += 1) {
      testPlacegroups[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await placetimeService.createPlacegroup(testPlacegroups[i]);
    }
    let returnedLists = await placetimeService.getAllPlacegroups();
    assert.equal(returnedLists.length, testPlacegroups.length);
    await placetimeService.deleteAllPlacegroups();
    returnedLists = await placetimeService.getAllPlacegroups();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant placegroup", async () => {
    try {
      const response = await placetimeService.deletePlacegroup("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Placegroup with this id", "Incorrect Response Message");
    }
  });
});
