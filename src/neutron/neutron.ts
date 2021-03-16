import { Watcher, Neutron, NeutronType } from "./types";

/**
 * Neutron observer
 */
export const neutron = <T>(previousState?: T, emitted = false) => (
  behavior: NeutronType = NeutronType.Default
): Neutron<T> => {
  const watchers = new Set<Watcher<T>>();

  /**
   * unsubscribes from current neutron
   */
  const abandon = (watcherToRemove: Watcher<T>) =>
    watchers.delete(watcherToRemove);

  /**
   * subscribes to current neutron
   */
  const watch = (watcher: Watcher<T>) => {
    watchers.add(watcher);

    if (behavior === NeutronType.ReEmit && emitted === true) {
      emitToSingleWatcher(watcher, previousState);
    }

    return () => abandon(watcher);
  };

  const emitToSingleWatcher = (
    watcher: Watcher<T>,
    nextState?: T,
    previousState?: T
  ) => watcher(nextState, previousState);

  /**
   * fires new data to all observers
   */
  const emit = (nextState?: T) => {
    watchers.forEach((watcher) =>
      emitToSingleWatcher(watcher, nextState, previousState)
    );

    previousState = nextState;
    emitted = true;
  };

  /**
   * return array of current watchers
   */
  const getWatchers = () => Array.from(watchers);

  return {
    watch,
    abandon,
    emit,
    getWatchers,
  };
};

/**
 * create a Neutron observer
 */
export const createNeutron = <T>(behavior?: NeutronType): Neutron<T> =>
  neutron<T>()(behavior);
