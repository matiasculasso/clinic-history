import { Injectable } from '@angular/core';
import { OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

@Injectable()
export class ConfigService {

    GetOpenIdConfig (): OpenIDImplicitFlowConfiguration {
        const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIDImplicitFlowConfiguration.stsServer = 'http://localhost:12000';
        openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:4200/';
        openIDImplicitFlowConfiguration.client_id = 'clinic-hitstory';
        openIDImplicitFlowConfiguration.response_type = 'id_token token';
        openIDImplicitFlowConfiguration.scope = 'openid dataEventRecords';
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:4200/';
        openIDImplicitFlowConfiguration.start_checksession = false;
        openIDImplicitFlowConfiguration.silent_renew = true;
        openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds = 0;
        openIDImplicitFlowConfiguration.post_login_route = '';
        openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
        openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
        openIDImplicitFlowConfiguration.auto_userinfo = true;
        openIDImplicitFlowConfiguration.log_console_warning_active = true;
        openIDImplicitFlowConfiguration.log_console_debug_active = true;
        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
        openIDImplicitFlowConfiguration.override_well_known_configuration = false;
        openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'http://localhost:12000/.well-known/openid-configuration/';
        openIDImplicitFlowConfiguration.storage = localStorage;

        // if you need custom parameters
        // oidcSecurityService.setCustomRequestParameters({ 't4': 'ABC abc 123', 't3': 'wo' });

        return openIDImplicitFlowConfiguration;
    }
}
