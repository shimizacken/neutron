export type Watcher<T> = (next?: T, previous?: T) => void;

export enum NeutronType {
  /**
   * emit only when explicitly called
   */
  Default = "default",
  /**
   * always re-emit latest state to any new watcher
   */
  ReEmit = "re-emit-for-new-watcher",
}

export interface Neutron<T> {
  watch: (watcher: Watcher<T>) => () => boolean;
  abandon: (watcher: Watcher<T>) => boolean;
  emit: (nextState?: T) => void;
  getWatchers: () => Array<Watcher<T>>;
}
