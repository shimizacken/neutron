import { createNeutron } from "../neutron";
import { NeutronType } from "../types";

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

  describe("behavior", () => {
    it("should emit without watcher", () => {
      const callBack1 = jest.fn();
      const callBack2 = jest.fn();

      const colorsNeutron = createNeutron(NeutronType.ReEmit);

      colorsNeutron.emit();

      colorsNeutron.watch(callBack1);

      expect(callBack1).toHaveBeenCalledTimes(1);
    });

    it("should re-emit once, after new watcher added", () => {
      const callBack1 = jest.fn();
      const callBack2 = jest.fn();
      const callBack3 = jest.fn();
      const colorsNeutron = createNeutron(NeutronType.ReEmit);

      colorsNeutron.watch(callBack1);
      colorsNeutron.emit();

      expect(callBack1).toHaveBeenCalledTimes(1);

      colorsNeutron.watch(callBack2);

      expect(callBack1).toHaveBeenCalledTimes(1);
      expect(callBack2).toHaveBeenCalledTimes(1);

      colorsNeutron.watch(callBack3);

      expect(callBack1).toHaveBeenCalledTimes(1);
      expect(callBack2).toHaveBeenCalledTimes(1);
      expect(callBack3).toHaveBeenCalledTimes(1);

      colorsNeutron.emit();

      expect(callBack1).toHaveBeenCalledTimes(2);
      expect(callBack2).toHaveBeenCalledTimes(2);
      expect(callBack3).toHaveBeenCalledTimes(2);
    });
  });
});
