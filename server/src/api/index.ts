import { createServer } from 'http';
import { parse } from 'url';
import app from '../app';

module.exports = (req: any, res: any) => {
  const server = createServer(app);
  const parsedUrl = parse(req.url!, true);
  req.url = parsedUrl.path;
  return server.emit('request', req, res);
};
