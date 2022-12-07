import {
  Application,
  Component,
  CoreBindings,
  createServiceBinding,
  inject,
} from '@loopback/core';
import {
  KeycloakConnectorServiceProvider,
} from '../services';

export class KeycloakComponent implements Component {
  constructor(@inject(CoreBindings.APPLICATION_INSTANCE) app: Application) {
    app.add(createServiceBinding(KeycloakConnectorServiceProvider));
  }
}
