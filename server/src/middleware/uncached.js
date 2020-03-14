export const uncached = (req, res, next) => {
  res.set({
    'Last-Modified': new Date().toUTCString(),
    Expires: -1,
    'Cache-Control': 'must-revalidate, private',
  });
  next();
};
