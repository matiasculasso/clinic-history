import { Injectable } from '@angular/core';
import { OpenIDImplicitFlowConfiguration } from 'angular-auth-oidc-client';
import { environment } from '../environments/environment';


@Injectable()
export class ConfigService {

    GetOpenIdConfig (): OpenIDImplicitFlowConfiguration {
        const oidcConfig = new OpenIDImplicitFlowConfiguration();
        oidcConfig.stsServer = environment.SERVER_URL;
        oidcConfig.redirect_url = environment.CLIENT_URL;
        oidcConfig.client_id = 'clinic-history';
        oidcConfig.response_type = 'id_token token';
        oidcConfig.scope = 'openid profile patients';
        oidcConfig.post_logout_redirect_uri = environment.CLIENT_URL;
        oidcConfig.start_checksession = true;
        oidcConfig.silent_renew = true;
        oidcConfig.silent_renew_offset_in_seconds = 0;
        oidcConfig.post_login_route = '/patiens';
        oidcConfig.forbidden_route = '/home';
        oidcConfig.unauthorized_route = '/home';
        oidcConfig.auto_userinfo = true;
        oidcConfig.log_console_warning_active = true;
        oidcConfig.log_console_debug_active = false;
        oidcConfig.max_id_token_iat_offset_allowed_in_seconds = 10;
        oidcConfig.override_well_known_configuration = false;
        oidcConfig.override_well_known_configuration_url = environment.SERVER_URL + '/.well-known/openid-configuration/';
        oidcConfig.storage = localStorage;

        // if you need custom parameters
        // oidcSecurityService.setCustomRequestParameters({ 't4': 'ABC abc 123', 't3': 'wo' });

        return oidcConfig;
    }
}
