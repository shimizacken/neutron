export type Watcher<T> = (next?: T, previous?: T) => void;

export interface Neutron<T> {
  watch: (watcher: Watcher<T>) => () => boolean;
  abandon: (watcher: Watcher<T>) => boolean;
  emit: (nextState?: T) => void;
  getWatchers: () => Array<Watcher<T>>;
}
