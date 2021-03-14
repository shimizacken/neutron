import { Observer, Neutron } from "./types";

/**
 * Neutron observer
 */
export const neutron = <T>(previousState?: T): Neutron<T> => {
  const observers = new Set<Observer<T>>();
  /**
   * unsubscribes from current neutron
   * @param fnToRemove
   */
  const leave = (fnToRemove: Observer<T>) => observers.delete(fnToRemove);

  /**
   * subscribes to current neutron
   * @param observer
   */
  const watch = (observer: Observer<T>) => {
    observers.add(observer);

    return () => leave(observer);
  };

  /**
   * fires new data to all observers
   * @param data
   */
  const emit = (next?: T) => {
    observers.forEach((fn) => fn(next, previousState));

    previousState = next;
  };

  return {
    watch,
    leave,
    emit,
  };
};

/**
 * create a Neutron observer
 */
export const createNeutron = <T>(): Neutron<T> => neutron();
