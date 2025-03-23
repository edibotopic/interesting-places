export const aboutController = {
  index: {
    handler: function(request, h) {
      const viewData = {
        title: "About InterestingPlaces",
      };
      return h.view("about-view", viewData);
    },
  },
};
