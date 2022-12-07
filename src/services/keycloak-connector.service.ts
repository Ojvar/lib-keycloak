/* eslint-disable @typescript-eslint/naming-convention */
import { BindingKey, BindingScope, injectable, Provider } from '@loopback/core';
import KeycloakConnect from 'keycloak-connect';

export const KEYCLOAK_CONNECTOR_SERVICE =
  BindingKey.create<KeycloakConnectorService>(
    'services.KeycloakConnectorService',
  );

export type KeycloakConnectorService = KeycloakConnect.Keycloak;

@injectable({ scope: BindingScope.APPLICATION })
export class KeycloakConnectorServiceProvider
  implements Provider<KeycloakConnectorService>
{
  _kc: KeycloakConnect.Keycloak;

  constructor() {
    this._kc = new KeycloakConnect({});
  }

  value(): KeycloakConnect.Keycloak {
    return this._kc;
  }
}
