import NodeCache from "node-cache";

const config: NodeCache.Options = {
  stdTTL: process.env.NODE_ENV === "production" ? 0 : 60,
};

const cacheConfigs = new NodeCache(config);
const cacheUser = new NodeCache(config);

export { cacheConfigs, cacheUser };
