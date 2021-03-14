import { createNeutron } from "../neutron";

describe("neutron test suite", () => {
  describe("create neutron", () => {
    it("should return new neutron", () => {
      const colorsNeutron = createNeutron<string>();

      expect(colorsNeutron).toMatchSnapshot();
    });

    it("should return empty watchers list", () => {
      const colorsNeutron = createNeutron<string>();

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });

    it("should return watcher list with 3 watchers", () => {
      const colorsNeutron = createNeutron();

      colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });
  });
});
