import { injectable, /* inject, */ BindingScope, Provider, inject, BindingKey } from '@loopback/core';
import { Request, RestBindings } from '@loopback/rest';
import { Keycloak } from 'keycloak-connect';
import { SecurityHelper } from '../helpers';
import { KEYCLOAK_CONNECTOR_SERVICE } from './keycloak-connector.service';

export const KEYCLOAK_SECURITY_SERVICE = BindingKey.create<KeycloakSecurity>('services.KeycloakSecurity');

export type KeycloakSecurity = SecurityHelper;

@injectable({ scope: BindingScope.REQUEST })
export class KeycloakSecurityProvider implements Provider<KeycloakSecurity> {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject(KEYCLOAK_CONNECTOR_SERVICE) private keycloak: Keycloak,
  ) { }

  value() {
    return new SecurityHelper(this.req, this.keycloak);
  }
}
