import { IncomingMessage, ServerResponse } from 'http';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';

const basicAuthGateway = () => {
  const doAuth = async (request: IncomingMessage, response: ServerResponse) => {
    await basicAuthMiddleware(request, response);
  };

  return { doAuth };
};

export { basicAuthGateway };
