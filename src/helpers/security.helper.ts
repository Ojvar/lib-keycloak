/* eslint-disable @typescript-eslint/naming-convention */
import { Request } from '@loopback/rest';
import { Grant, Keycloak, Token } from 'keycloak-connect';

export type UserInfo = Record<string, unknown> & {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export class SecurityHelper {
  constructor(private req: Request, private keycloak: Keycloak) { }

  get grant(): Grant {
    return this.req.kauth.grant as Grant;
  }

  get accessToken(): Record<string, unknown | string> {
    return this.grant.access_token as unknown as {
      token: string;
      [key: string]: unknown;
    };
  }

  async getUserInfo(): Promise<UserInfo> {
    const accessToken = this.grant.access_token as Token;
    return this.keycloak.grantManager.userInfo<Token, UserInfo>(accessToken);
  }
}
