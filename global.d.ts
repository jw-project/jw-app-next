import type NodeCache from 'node-cache';

declare global {
  var cacheConfigs: NodeCache;
  var cacheUser: NodeCache;
}

export {};
