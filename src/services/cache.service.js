const mcache = require('memory-cache');

function cacheServie(duration) {
  return (req, res, next) => {
    const key = `__express__ + ${req.originalUrl}` || req.url;
    const cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        mcache.put(key, body, duration * 100);
        res.sendResponse(body);
        return body;
      };
      next();
    }
    return next();
  };
}
module.exports = cacheServie;
