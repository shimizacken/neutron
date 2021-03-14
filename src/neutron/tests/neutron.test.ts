import { createNeutron } from "../neutron";

describe("neutron test suite", () => {
  describe("create neutron", () => {
    it("should return new neutron", () => {
      const colorsNeutron = createNeutron<string>();

      expect(colorsNeutron).toMatchSnapshot();
    });
  });

  describe("watchers", () => {
    it("should return empty watchers list", () => {
      const colorsNeutron = createNeutron<string>();

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });

    it("should return watcher list with single watcher", () => {
      const colorsNeutron = createNeutron();

      colorsNeutron.watch(() => {});

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });

    it("should return watcher list with 3 watchers", () => {
      const colorsNeutron = createNeutron();

      colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });

    it("should remove watcher from the watchers list", () => {
      const colorsNeutron = createNeutron();

      const abandon = colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});
      colorsNeutron.watch(() => {});

      abandon();

      expect(colorsNeutron.getWatchers()).toMatchSnapshot();
    });
  });
});
