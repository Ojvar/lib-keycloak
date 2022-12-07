import {
  InvocationContext,
  InvocationResult,
  ValueOrPromise,
} from '@loopback/core';
import { RestBindings } from '@loopback/rest';
import KeycloakConnect from 'keycloak-connect';
import { KEYCLOAK_CONNECTOR_SERVICE } from '../services/keycloak-connector.service';

export function protect(roles = '') {
  return (
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) => {
    const keycloak: KeycloakConnect.Keycloak =
      invocationCtx.getSync<KeycloakConnect.Keycloak>(
        KEYCLOAK_CONNECTOR_SERVICE,
      );

    const req = invocationCtx.getSync(RestBindings.Http.REQUEST);
    const res = invocationCtx.getSync(RestBindings.Http.RESPONSE);

    return new Promise(resolve => {
      keycloak.protect(roles)(req, res, () => {
        resolve(next());
      });
    });
  };
}
