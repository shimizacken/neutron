export type Observer<T> = (next?: T, previous?: T) => void;

export interface Neutron<T> {
  watch: (observer: Observer<T>) => () => boolean;
  leave: (observer: Observer<T>) => boolean;
  emit: (data?: T) => void;
}
