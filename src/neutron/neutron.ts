import { Watcher, Neutron, Behavior } from "./types";

/**
 * Neutron observer
 */
export const neutron = <T>(previousState?: T) => (
  behavior: Behavior = "default"
): Neutron<T> => {
  const watchers = new Set<Watcher<T>>();
  /**
   * unsubscribes from current neutron
   * @param fnToRemove
   */
  const abandon = (watcherToRemove: Watcher<T>) =>
    watchers.delete(watcherToRemove);

  /**
   * subscribes to current neutron
   * @param watcher
   */
  const watch = (watcher: Watcher<T>) => {
    watchers.add(watcher);

    if (behavior === "re-emit for new watcher" && watchers.size > 1) {
      emitToSingleWatcher(watcher, previousState);
    }

    return () => abandon(watcher);
  };

  const emitToSingleWatcher = (watcher: Watcher<T>, nextState?: T) =>
    watcher(nextState);

  /**
   * fires new data to all observers
   * @param data
   */
  const emit = (next?: T) => {
    watchers.forEach((fn) => fn(next, previousState));

    previousState = next;
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
export const createNeutron = <T>(behavior?: Behavior): Neutron<T> =>
  neutron<T>()(behavior);
