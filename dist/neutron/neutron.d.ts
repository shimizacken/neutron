import { Neutron, NeutronType } from "./types";
/**
 * Neutron observer
 */
export declare const neutron: <T>(previousState?: T | undefined, emitted?: boolean) => (behavior?: NeutronType) => Neutron<T>;
/**
 * create a Neutron observer
 */
export declare const createNeutron: <T>(behavior?: NeutronType | undefined) => Neutron<T>;
