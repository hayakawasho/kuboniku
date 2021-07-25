import { IncomingMessage, ServerResponse } from 'http';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';

const basicAuthGateway = () => {
  const authenticate = async (
    request: IncomingMessage,
    response: ServerResponse
  ) => {
    await basicAuthMiddleware(request, response);
  };

  return { authenticate };
};

export { basicAuthGateway };
