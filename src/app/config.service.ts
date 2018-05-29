import { Injectable } from '@angular/core';
import { OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';

@Injectable()
export class ConfigService {

    GetOpenIdConfig (): OpenIDImplicitFlowConfiguration {
        const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
        openIDImplicitFlowConfiguration.stsServer = 'http://matiasculasso-001-site1.btempurl.com';
        openIDImplicitFlowConfiguration.redirect_url = 'http://clinic-history-app.herokuapp.com';
        openIDImplicitFlowConfiguration.client_id = 'clinic-hitstory';
        openIDImplicitFlowConfiguration.response_type = 'id_token token';
        openIDImplicitFlowConfiguration.scope = 'openid profile patients';
        openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://clinic-history-app.herokuapp.com';
        openIDImplicitFlowConfiguration.start_checksession = false;
        openIDImplicitFlowConfiguration.silent_renew = true;
        openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds = 0;
        openIDImplicitFlowConfiguration.post_login_route = '/patiens';
        openIDImplicitFlowConfiguration.forbidden_route = '/home';
        openIDImplicitFlowConfiguration.unauthorized_route = '/home';
        openIDImplicitFlowConfiguration.auto_userinfo = true;
        openIDImplicitFlowConfiguration.log_console_warning_active = true;
        openIDImplicitFlowConfiguration.log_console_debug_active = false;
        openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
        openIDImplicitFlowConfiguration.override_well_known_configuration = false;
        openIDImplicitFlowConfiguration.override_well_known_configuration_url =
            'http://matiasculasso-001-site1.btempurl.com/.well-known/openid-configuration/';
        openIDImplicitFlowConfiguration.storage = localStorage;

        // if you need custom parameters
        // oidcSecurityService.setCustomRequestParameters({ 't4': 'ABC abc 123', 't3': 'wo' });

        return openIDImplicitFlowConfiguration;
    }
}
