/**
 * Beat Saber general-purpose scripting library.
 *
 * This library provides beatmap schema, class object, and various toolings to handle Beat Saber map.
 *
 * @module
 */

export * from './beatmap/mod';
export * as types from './types/mod';
export * as convert from './converter/mod';
export * as optimize from './optimize';
export * as utils from './utils/mod';
export { default as logger } from './logger';
