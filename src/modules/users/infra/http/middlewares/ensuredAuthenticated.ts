import { request } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import authConfig from '../../../../../configs/auth';

interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

interface IContex {
  headers: {
    authorization: string;
  };
}

export const ensureAuthenticated: MiddlewareFn<IContex> = async (
  { context },
  next,
) => {
  const { authorization } = context.headers;

  const authHeader = authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as tokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Invalid JWT token');
  }
};
