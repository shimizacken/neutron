import { createNeutron } from "../neutron";

describe("neutron test suite", () => {
  describe("create neutron", () => {
    it("should return new neutron", () => {
      const colorsNeutron = createNeutron<string>();

      expect(colorsNeutron).toMatchSnapshot();
    });
  });

  describe("watch", () => {
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

  describe("emit", () => {
    it("should emit once", () => {
      const callBack = jest.fn();
      const colorsNeutron = createNeutron();

      colorsNeutron.watch(callBack);
      colorsNeutron.emit();

      expect(callBack).toHaveBeenCalledTimes(1);
    });

    it("should emit once when watch before one emit", () => {
      const callBack = jest.fn();
      const colorsNeutron = createNeutron();

      colorsNeutron.emit();
      colorsNeutron.watch(callBack);
      colorsNeutron.emit();

      expect(callBack).toHaveBeenCalledTimes(1);
    });

    it("should emit 2 times when watch before 2 emits", () => {
      const callBack = jest.fn();
      const colorsNeutron = createNeutron();

      colorsNeutron.emit();
      colorsNeutron.watch(callBack);
      colorsNeutron.emit();
      colorsNeutron.emit();

      expect(callBack).toHaveBeenCalledTimes(2);
    });

    it("should callback not called after abandon watch", () => {
      const callBack = jest.fn();
      const colorsNeutron = createNeutron();

      const abandon = colorsNeutron.watch(callBack);

      abandon();

      colorsNeutron.emit();

      expect(callBack).toHaveBeenCalledTimes(0);
    });
  });
});
