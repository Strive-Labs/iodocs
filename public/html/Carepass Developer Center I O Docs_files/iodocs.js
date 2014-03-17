// Make iodocs object available only when page is finished rendering
$(document).ready(function () {
    // Set global var
    window.iodocs = (function () {
        // Private vars
        var self                     = {},
            apiServiceBox            = $('.services'),
            apiDescriptionListBoxes  = $('.apiDescriptionList'),
            apiSelectBox             = $('#apiId'),
            apiTitle                 = $('#apiTitle'),
            apiCredentialBox         = $('.credentials'), // TODO: unused
            apiCredentialForm        = $('#credentials'),
            syncTokenValue           = apiCredentialForm.find('input[name=ajax_synchronization_token]').val(),
            apiKeyInput              = $('#apiKey'),
            apiSecretInput           = $('#apiSecret'),
            apiKeySecretInput        = $('#apiKeySecret'),
            showManualKeySecret      = $('#showManualKeySecret'),
            apiNameBox               = $('#apiName'), // TODO: unused
            emControlBox             = $('#controls'),
            apiEndpointListBoxes     = $('.endpointList'),
            toggleEndpointsLink      = $('#toggleEndpoints'),
            toggleMethodsLink        = $('#toggleMethods'),
            apiOAuth2FlowType        = $('#apiOAuth2FlowType'),
            apiOAuth2AuthBtn         = $('#apiOAuth2AuthorizationButton'),
            apiOAuth2ImplABtn        = $('#apiOAuth2ImplicitExchangeButton'),
            apiOAuth2CCBtn           = $('#apiOAuth2AuthClientCredExchangeButton'),
            apiOAuth2PCBtn           = $('#apiOAuth2AuthPassCredExchangeButton'),
            apiOAuth2AccessBtn       = $('#apiOAuth2AuthExchangeButton'),
            apiBasicAuthName         = $('#apiBasicAuthUsername'),
            apiBasicAuthPass         = $('#apiBasicAuthPassword');

        // Select API
        self.selectApiById = function (id) {
            // Reset selected attribute
            apiEndpointListBoxes.attr('data-is-selected', false);
            apiDescriptionListBoxes.attr('data-is-selected', false);

            // No id selected, so hide everything
            if (!id) {
                return self.hideAll();
            }

            // Set endpoint list box as selected
            apiEndpointListBoxes.filter('#api' + id).attr('data-is-selected', true);
            apiDescriptionListBoxes.filter('#apiDescription' + id).attr('data-is-selected', true);


            // Show everything that needs to be shown
            self.showApiCredentialBox(id);
            self.showApiDescriptionBox();
            self.showEMControlBox();
            self.hideAllUnselectedApiEndpointLists();
            self.showSelectedApiEndpointList();
            self.showAllSelectedEndpoints();

            return null;
        };

        // Get Selected API Endpoint List Box
        self.getSelectedApiEndpointListBox = function () {
            return apiEndpointListBoxes.filter('[data-is-selected=true]');
        };

        // Get Selected API Id
        self.getSelectedApiId = function () {
            return self.getSelectedApiEndpointListBox().attr('data-api-id');
        };

        // Show API Info Box
        self.showApiDescriptionBox = function () {
            self.hideApiDescriptionBox();
            apiDescriptionListBoxes.filter('#apiDescription' + self.getSelectedApiId() + ':hidden').slideDown();
        };

        // Hide API Info Box
        self.hideApiDescriptionBox = function () {
            apiDescriptionListBoxes.filter(':not(#apiDescription' + self.getSelectedApiId() + '):visible').slideUp();
        };

        // Show EM Control box
        self.showEMControlBox = function () {
            emControlBox.filter(':hidden').slideDown();
        };

        // Hide EM Control box
        self.hideEMControlBox = function () {
            emControlBox.filter(':visible').slideUp();
        };

        // Show API Endpoint list
        self.showSelectedApiEndpointList = function () {
            apiEndpointListBoxes.filter('#api' + self.getSelectedApiId() + ':hidden').slideDown();
        };

        // Hide all API Endpoint lists
        self.hideAllApiEndpointLists = function () {
            apiEndpointListBoxes.filter(':visible').slideUp();
        };

        // Hide all API Endpoint Lists that aren't id
        self.hideAllUnselectedApiEndpointLists = function () {
            apiEndpointListBoxes.filter(':not(#api' + self.getSelectedApiId() + '):visible').slideUp();
        };

        // Show all endpoints for shown endpoint list
        self.toggleAllSelectedEndpoints = function () {
            // Get all selected methods lists
            var methodsLists = apiEndpointListBoxes.find('.endpoint:visible > .methods');

            // Show all method lists if at least one is not visible
            if (methodsLists.filter(':hidden').length) {
                methodsLists.slideDown();
            } else {
                methodsLists.slideUp();
            }
        };

        // Show all selected endpoints
        self.showAllSelectedEndpoints = function () {
            apiEndpointListBoxes.find('.endpoint:visible > .methods:hidden').slideDown();
        };

        // Toggle all methods for shown endpoint list
        self.toggleAllSelectedMethods = function () {
            // Keep tabs on how many method lists are enabled
            var methodsLists      = apiEndpointListBoxes.find('.endpoint:visible > .methods'),
                methodsListsCount = methodsLists.filter(':hidden').length;

            // Show all endpoints
            self.showAllSelectedEndpoints();

            // Force show forms if at least one method list wasn't shown (which is now shown)
            if (methodsListsCount) {
                return self.showAllSelectedMethods();
            }

            // Get all visible methods
            var methods = methodsLists.find('.method:visible > form');

            // Show all methods if at least one is not visible
            if (methods.filter(':hidden').length) {
                methods.slideDown();
            } else {
                methods.slideUp();
            }

            return null;
        };

        // Show all selected methods
        self.showAllSelectedMethods = function () {
            apiEndpointListBoxes.find('.endpoint:visible .method:visible > form:hidden').slideDown();
        };

        // Hide all selected methods
        self.hideAllSelectedMethods = function () {
            apiEndpointListBoxes.find('.endpoint.visible .method:visible > form:visible').slideUp();
        };

        // Hide ALL the things!
        self.hideAll = function () {
            self.hideAllApiCredentialBoxes();
            self.hideApiDescriptionBox();
            self.hideEMControlBox();
            self.hideAllApiEndpointLists();
        };

        /*** START CREDENTIALS ***/

        self.getCurrentAuthType = function () {
            var apiStoreElem = $('#api' + apiSelectBox.val()),
                auth_type = apiStoreElem.attr('data-auth-type');

            return auth_type;
        };

        self.getBasicAuthEnabled = function () {
            var apiStoreElem = $('#api' + apiSelectBox.val()),
                basicAuth = apiStoreElem.attr('data-basic-auth');

            return (basicAuth === 'true');
        };

        self.showApiCredentialBox = function (id) { // TODO: id is unused

            self.hideAllApiCredentialBoxes();

            apiCredentialForm.each(function () {
                this.reset();
            });

            var apiStoreElem = $('#api' + apiSelectBox.val()),
                auth_type = self.getCurrentAuthType(),
                authCSSClass = ".credentials_start." + auth_type,
                available_keys = $.parseJSON(apiStoreElem.attr('data-available-keys'));

            if (self.getBasicAuthEnabled()) {
                $('#apiBasicAuthCredFlowContainer').show();
            }

            switch (auth_type) {
            case 'key':
                $('#apiSecretContainer').hide();
                $('#apiKeySecretListContainer').hide();
                $('#apiKeyContainer').hide();

                if (available_keys && available_keys.length) {

                    $('#apiKeySecret').empty();

                    $.each(available_keys, function (k, v) {
                        var label = '';
                        if (v.application) {
                            label = v.application + ": " + v.key;
                        } else {
                            label = v.key;
                        }
                        $('#apiKeySecret').append($('<option>', { value: v.key, "data-secret": v.secret}).text(label));
                    });

                    $('#apiKeySecretListContainer').slideDown();
                } else {
                    $('#apiKeyContainer').slideDown();

                    if (apiStoreElem.attr('data-secret') === "1") {
                        $('#apiSecretContainer').slideDown();
                    }
                }
                break;

            case 'oauth2':

                var auth_flows = $.parseJSON(apiStoreElem.attr('data-auth-flows'));

                $('#apiOAuth2FlowType').empty();

                $('#apiOAuth2PresetKeysContainer').hide();

                if (auth_flows) {
                    $.each(auth_flows, function (k, v) {

                        var auth_flow_desc = function (v) {
                            switch (v) {
                            case 'auth_code':
                                return "Authorization Code / Web Server";
                            case 'implicit':
                                return "Implicit / Javascript Client";
                            case 'password_cred':
                                return "Password Credentials";
                            case 'client_cred':
                                return "Client Credentials";
                            default:
                                return "Unknown";
                            }
                        };

                        $('#apiOAuth2FlowType').append($('<option>', { value: v }).text(auth_flow_desc(v)));
                    });
                }

                if (available_keys && available_keys.length) {
                    $('#apiOAuth2PresetKeys').empty();
                    $('#apiOAuth2PresetKeys').append($('<option>', {value : "__manual"}).text("Manual Input"));

                    $.each(available_keys, function (k, v) {
                        $('#apiOAuth2PresetKeys').append($('<option>', { value: v.key, "data-secret": v.secret}).text(v.application));
                    });

                    $('#apiOAuth2PresetKeysContainer').slideDown();
                }

                $('#apiOAuth2FlowType').change();

                break;
            default:
                break;
            }

            $(authCSSClass).slideDown();
        };


        self.hideAllApiCredentialBoxes = function () {
            $('.credentials').filter(':visible').slideUp();
        };

        self.hideOAuth2CredentialInputs = function () {
            $('.credentials.oauth2').not('.credentials_start').slideUp();
        };

        self.setOAuth2AuthorizeCode = function (code) {
            $('#apiOAuth2AuthorizeCode').val(code);
            $('#apiOAuth2AuthorizeCodeContainer').slideDown();

            if ($('#api' + self.getSelectedApiId()).attr('data-auto-exchange-auth-code') === "1") {
                apiOAuth2AccessBtn.hide();
                self.exchangeAuthCodeforAccessToken();
            }
        };

        self.getAuthorizationCode = function (client_id, client_secret) {
            // open empty window before async call (async code triggers popup blocker on window.open)
            oAuth2AuthWindow = window.open(null, "masheryOAuth2AuthWindow", "width=300,height=400");

            $.ajax({
                async: true,
                headers:  {
                    'X-Ajax-Synchronization-Token': syncTokenValue
                },
                data: {
                    apiId : apiSelectBox.val(),
                    client_id : client_id,
                    client_secret : client_secret,
                    auth_flow : "auth_code"
                },
                dataType: 'json',
                global: false,
                timeout: 10000,
                type: 'POST',
                url: '/io-docs/getoauth2authuri',
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.success) {
                        oAuth2AuthWindow.location.href = data.authorize_uri;
                        oAuth2AuthWindow.focus();
                    // } else {  TODO:  Should this return an error on failure?
                        // self.resetOAuth2AccessToken();
                        // alert(jqXHR.responseText);
                        // alert("ERROR: 324  --  Sorry there was an error getting an access token. Try again later.");
                    } else {
                        oAuth2AuthWindow.close();
                    }
                }
            });
        };

        self.sendImplicitAccessToken = function (token, errorCallback, successCallback) {
            $.ajax({
                async: true,
                headers: {
                    'X-Ajax-Synchronization-Token': syncTokenValue
                },
                data: {
                    apiId: apiSelectBox.val(),
                    access_token : token.access_token,
                    expires_in : token.expires_in,
                    token_type : token.token_type
                },
                dataType : 'json',
                global : false,
                timeout : 10000,
                type: 'POST',
                url : '/io-docs/catchOauth2ImplicitToken',
                error : errorCallback,
                success : successCallback
            });
        };

        self.getImplicitAccessToken = function (client_id) {
            // open empty window before async call (async code triggers popup blocker on window.open)
            oAuth2AuthWindow = window.open(null, "masheryOAuth2AuthWindow", "width=300,height=400");
            $.ajax({
                async: true,
                headers:  {
                    'X-Ajax-Synchronization-Token': syncTokenValue
                },
                data: {
                    apiId : apiSelectBox.val(),
                    client_id : client_id,
                    auth_flow : "implicit"
                },
                dataType: 'json',
                global: false,
                timeout: 10000,
                type: 'POST',
                url: '/io-docs/getoauth2authuri',
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.success) {
                        oAuth2AuthWindow.location.href = data.authorize_uri;
                        oAuth2AuthWindow.focus();
                    } else {
                        oAuth2AuthWindow.close();
                        self.resetOAuth2AccessToken();
                        // TODO:  Should this display an error on failure?
                        // alert(jqXHR.responseText);
                    }
                }
            });
        };

        self.resetOAuth2AccessToken = function () {
            $('#apiOAuth2AccessToken').val("");
            $('#apiOAuth2AccessTokenContainer').slideUp();
        };

        self.setOAuth2AccessToken = function (token) {
            $('#apiOAuth2AccessToken').val(token);
            $('#apiOAuth2AccessTokenContainer').slideDown();
        };

        self.getAccessTokenFromPasswordCred = function (client_id, client_secret, username, password) {

            $.ajax({
                async : true,
                headers: {
                    'X-Ajax-Synchronization-Token' : syncTokenValue
                },
                data : {
                    apiId : apiSelectBox.val(),
                    auth_flow : 'password_cred',
                    client_id : client_id,
                    client_secret : client_secret,
                    username: username,
                    password: password
                },
                dataType: 'json',
                global : false,
                timeout: 10000,
                type : 'GET',
                url : '/io-docs/getoauth2accesstoken',
                error : function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                success : function (data, textStatus, jqXHR) {
                    if (data.success) {
                        self.setOAuth2AccessToken(data.result.access_token);
                    } else {
                        self.resetOAuth2AccessToken();
                        alert(jqXHR.responseText);
                    }
                }
            });
        };

        self.getAccessTokenFromClientCred = function (client_id, client_secret) {

            $.ajax({
                async : true,
                headers: {
                    'X-Ajax-Synchronization-Token' : syncTokenValue
                },
                data : {
                    apiId : apiSelectBox.val(),
                    auth_flow : 'client_cred',
                    client_id : client_id,
                    client_secret : client_secret
                },
                dataType: 'json',
                global : false,
                timeout: 10000,
                type : 'GET',
                url : '/io-docs/getoauth2accesstoken',
                error : function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                success : function (data, textStatus, jqXHR) {
                    if (data.success) {
                        self.setOAuth2AccessToken(data.result.access_token);
                    } else {
                        self.resetOAuth2AccessToken();
                        alert(jqXHR.responseText);
                    }
                }
            });
        };

        self.exchangeAuthCodeforAccessToken = function () {
            $.ajax({
                async: true,
                headers: {
                    'X-Ajax-Synchronization-Token' : syncTokenValue
                },
                data: {
                    apiId : apiSelectBox.val(),
                    auth_flow : 'auth_code',
                    authorization_code : $('#apiOAuth2AuthorizeCode').val()
                },
                dataType: 'json',
                global: false,
                timeout: 10000,
                type: 'GET',
                url: '/io-docs/getoauth2accesstoken',
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(jqXHR.responseText);
                },
                success: function (data, textStatus, jqXHR) {
                    if (data.success) {
                        self.setOAuth2AccessToken(data.result.access_token);
                    } else {
                        self.resetOAuth2AccessToken();
                        alert(jqXHR.responseText);
                    }
                }
            });
        };

        /*** END CREDENTIALS ***/


        // Callback for OAuth Success
        self.oauthSuccess = function () {
            alert('You have successfully logged in');
        };

        // Bind page elements

        // Set select to add 40px to it's calculated width, padding doesn't work in IE
        apiSelectBox.width(apiSelectBox.outerWidth() + 40);

        // Set the span in the h2 to reflect selected option
        apiTitle.text(apiSelectBox.find('option:selected').text()).width(apiSelectBox.outerWidth()).height(apiSelectBox.outerHeight());

        apiSelectBox.change(function () {
            self.selectApiById(apiSelectBox.val());
            apiTitle.text(apiSelectBox.find('option:selected').text());
        });

        $('#apiOAuth2PresetKeys').change(function (event) {

            var selectedPresetKey = $('#apiOAuth2PresetKeys').find('> :selected');

            if ((selectedPresetKey.val() === "__manual") || (selectedPresetKey.val() === "")) {
                $('.oauth2_client_id_field').val("");
                $('.oauth2_client_secret_field').val("");
            } else {
                $('.oauth2_client_id_field').val(selectedPresetKey.val());
                $('.oauth2_client_secret_field').val(selectedPresetKey.attr('data-secret'));
            }

        });

        apiOAuth2FlowType.change(function (event) {

            self.hideOAuth2CredentialInputs();

            if (apiOAuth2FlowType.val() === "") {
                return;
            }

            switch (apiOAuth2FlowType.val()) {
            case 'auth_code':
                $('#apiOAuth2AuthCodeFlowContainer').slideDown();
                break;
            case 'implicit':
                $('#apiOAuth2ImplicitFlowContainer').slideDown();
                break;
            case 'password_cred':
                $('#apiOAuth2PasswordCredFlowContainer').slideDown();
                break;
            case 'client_cred':
                $('#apiOAuth2ClientCredFlowContainer').slideDown();
                break;
            default:
                break;
            }

        });

        apiOAuth2PCBtn.click(function (event) {
            event.preventDefault();
            self.getAccessTokenFromPasswordCred(
                $('#apiOAuth2ClientIdPasswordCred').val(),
                $('#apiOAuth2ClientSecretPasswordCred').val(),
                $('#apiOAuth2Username').val(),
                $('#apiOAuth2Password').val());
        });

        apiOAuth2CCBtn.click(function (event) {
            event.preventDefault();
            self.getAccessTokenFromClientCred(
                $('#apiOAuth2ClientIdClientCred').val(),
                $('#apiOAuth2ClientSecretClientCred').val());
        });

        apiOAuth2AuthBtn.click(function (event) {
            event.preventDefault();
            self.getAuthorizationCode(
                $('#apiOAuth2ClientIdAuthCode').val(),
                $('#apiOAuth2ClientSecretAuthCode').val());
        });

        apiOAuth2ImplABtn.click(function (event) {
            event.preventDefault();
            self.getImplicitAccessToken(
                $('#apiOAuth2ClientIdImplicit').val());
        });

        apiOAuth2AccessBtn.click(function (event) {
            event.preventDefault();
            self.exchangeAuthCodeforAccessToken();
        });

        showManualKeySecret.click(function (event) {
            // Disable following link
            event.preventDefault();

            var apiStoreElem = $('#api' + apiSelectBox.val());

            $('#apiSecretContainer').hide();
            $('#apiKeySecretListContainer').hide();
            $('#apiKeyContainer').hide();
            $('#apiKeyContainer').slideDown();

            if (apiStoreElem.attr('data-secret') === "1") {
                $('#apiSecretContainer').slideDown();
            }
        });

        toggleEndpointsLink.click(function (event) {
            // Disable following link
            event.preventDefault();

            self.hideAllSelectedMethods();
            self.toggleAllSelectedEndpoints();
        });

        toggleMethodsLink.click(function (event) {
            // Disable following link
            event.preventDefault();

            self.toggleAllSelectedMethods();
        });

        $('.endpoint > h3 > span.name').click(function (event) {
            // Disable following link
            event.preventDefault();

            // Toggle methods
            $(this).closest('.endpoint').find('.methods').slideToggle();
        });

        $('.list-methods > a').click(function (event) {
            // Disable following link
            event.preventDefault();

            $(this).closest('.endpoint').find('.methods:hidden').slideDown();
        });

        $('.expand-methods > a').click(function (event) {
            // Disable following link
            event.preventDefault();

            $(this).closest('.endpoint').find('.methods:hidden').slideDown();
            $(this).closest('.endpoint').find('.method:visible > form:hidden').slideDown();
        });

        $('.method > div.title').click(function (event) {
            // Disable following link
            event.preventDefault();

            $(this).parent().find('form').slideToggle();
        });

        $('.method > form').submit(function (event) {
            // Disable actual submission
            event.preventDefault();

            // Get response box, form params, and api values
            var responseBox = $(this).children('div.result'),
                errorBox    = $(this).children('div.error'),
                params      = $(this).serializeArray(),
                apiId       = {
                    name:  'apiId',
                    value: self.getSelectedApiId()
                },
                apiKey      = {
                    name:  'apiKey',
                    value: apiKeyInput.val()
                },
                apiSecret   = {
                    name:  'apiSecret',
                    value: apiSecretInput.val()
                },
                basicAuthName = {
                    name:  'basicAuthName',
                    value: apiBasicAuthName.val()
                },
                basicAuthPass = {
                    name:  'basicAuthPass',
                    value: apiBasicAuthPass.val()
                };

            // Get api key and secret from key/secret list if enabled
            if (apiKeySecretInput.is(':visible')) {
                // Replace api key and secret values
                apiKey.value    = apiKeySecretInput.find('> :selected').val();
                apiSecret.value = apiKeySecretInput.find('> :selected').attr('data-secret');
            }

            // Add additional values to params
            params.push(apiId, apiKey, apiSecret, basicAuthName, basicAuthPass);

            // If response node doesn't exist, create it
            if (!responseBox.length) {
                // Add clear link
                $('<a class="clear-results" href="#">Clear Results</a>').css({
                    display: 'none'
                }).click(function (event) {
                    // Don't follow link
                    event.preventDefault();

                    // Delete clear link
                    $(this).fadeOut(function () {
                        $(this).remove();
                    });

                    // Slide up the response and delete it and the clear link
                    $(responseBox).slideUp(function () {
                        responseBox.remove();
                    });
                }).insertAfter($(this).find('> input[type=submit]')).fadeIn();

                // Build select link
                var selectLink = $('<a class="select-all" href="#">Select content</a>').click(function (event) {
                    // Don't follow link
                    event.preventDefault();

                    // Select the content from the response node
                    selectElementText($(this).parent().next('pre')[0]);
                });

                // Build response box
                responseBox = $('<div class="result" />').css({
                    display: 'none'
                });

                // Add request uri
                responseBox.append(
                    $('<h4 class="call">Request URI</h4>'),
                    $('<pre class="call" />'));

                // Add request headers
                responseBox.append(
                    $('<h4 class="requestHeaders">Request Headers</h4>').hide().append(selectLink.clone(true)),
                    $('<pre class="requestHeaders prettyprint" />').hide());

                // Add request cookies
                responseBox.append(
                    $('<h4 class="requestCookies">Request Cookies</h4>').hide().append(selectLink.clone(true)),
                    $('<pre class="requestCookies prettyprint" />').hide());

                // Add request body
                responseBox.append(
                    $('<h4 class="requestBody">Request Body</h4>').hide().append(selectLink.clone(true)),
                    $('<pre class="requestBody prettyprint" />').hide());

                // Add response status
                responseBox.append(
                    $('<h4 class="responseStatus">Response Status</h4>').append(selectLink.clone(true)),
                    $('<pre class="responseStatus prettyprint" />'));

                // Add response headers
                responseBox.append(
                    $('<h4 class="headers">Response Headers</h4>').append(selectLink.clone(true)),
                    $('<pre class="headers prettyprint" />'));

                // Add response body
                responseBox.append(
                    $('<h4 class="response">Response Body</h4>').append(selectLink.clone(true)),
                    $('<pre class="response prettyprint" />'));

                // Add response box to form and show it
                responseBox.appendTo(this).slideDown();
            }

            // Response Box is shown by default
            responseBox.show();

            if (!errorBox.length) {
                // Build response box
                errorBox = $('<div class="error" />').css({
                    display: 'none'
                });

                errorBox.append(
                    $('<h4 class="error">Error</h4>'),
                    $('<pre class="error prettyprint" />'));

                errorBox.appendTo(this);
            }

            // Error Box is hidden by default
            errorBox.hide();

            // Fire ajax
            $.ajax({
                url:      '/io-docs/call-api',
                type:     'POST',
                headers:  {
                    'X-Ajax-Synchronization-Token': syncTokenValue
                },
                data:     params,
                dataType: 'json',
                beforeSend: function () {
                    // Show loading text for response areas
                    responseBox.children('pre').text('Loading...').removeClass('error');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    errorBox.find('pre.error').text(jqXHR.responseText);
                    responseBox.hide();
                    errorBox.show();
                    // responseBox.replaceWith($('<div class="result"><h4 class="response">Error</h4><pre class="prettyprint error">' + jqXHR.responseText + '</pre></div>')).toggle(true);
                },
                success: function (data) {
                    // Init formatted text
                    var formattedText = data.responseBody;
                    var contentType = data.responseHeaders && data.responseHeaders['Content-Type'] || '';
                    var validResponse = (data.status.code > 0 || data.status.text) || formattedText.length > 0;

                    // Set up call request
                    responseBox.find('pre.call').text(data.requestUri);

                    // Set up call request headers
                    responseBox.find('pre.requestHeaders').text($(data.requestHeaders).length ? formatJSON(data.requestHeaders) : '');
                    responseBox.find('.requestHeaders').toggle($(data.requestHeaders).length ? true : false);

                    // Set up call request cookies
                    responseBox.find('pre.requestCookies').text($(data.requestCookies).length ? formatJSON(data.requestCookies) : '');
                    responseBox.find('.requestCookies').toggle($(data.requestCookies).length ? true : false);

                    // Set up call request body
                    responseBox.find('pre.requestBody').text(data.requestBody || '');
                    responseBox.find('.requestBody').toggle(data.requestBody ? true : false);

                    // Set up response status
                    responseBox.find('pre.responseStatus').text(data.status.code + ' ' + data.status.text).toggleClass('error', data.status.text !== 'OK');
                    responseBox.find('.responseStatus').toggle((data.status.code > 0 || data.status.text) ? true : false);

                    // Set up response headers
                    responseBox.find('pre.headers').text(formatJSON(data.responseHeaders)).toggleClass('error', data.status.text !== 'OK');
                    responseBox.find('.headers').toggle($(data.responseHeaders).length ? true : false);

                    // Filter format if available content type
                    switch (contentType.split(';')[0]) {
                    // Parse types as JSON
                    case 'application/javascript':
                    case 'application/json':
                    case 'application/x-javascript':
                    case 'application/x-json':
                    case 'text/javascript':
                    case 'text/json':
                    case 'text/x-javascript':
                    case 'text/x-json':
                        try {
                            // js_beautify will format it if it's JSON or JSONP
                            formattedText = js_beautify(formattedText, { 'preserve_newlines': false });
                        } catch (err) {
                            // js_beautify didn't like it, return it as it was
                            formattedText = data.responseBody;
                        }
                        break;

                    // Parse types as XHTML
                    case 'application/xml':
                    case 'text/xml':
                    case 'text/html':
                    case 'text/xhtml':
                        formattedText = formatXML(formattedText) || '';
                        break;
                    default:
                        break;
                    }

                    // Set response text
                    responseBox.children('pre.response').text(formattedText).toggleClass('error', data.status.text !== 'OK');
                    responseBox.find('.response').toggle(validResponse? true : false);

                    // display service errors
                    if (data.errorMessage) {
                        errorBox.find('pre.error').text(data.errorMessage);
                        errorBox.show();
                    }

                    // Fire pretty print on nodes
                    prettyPrint();
                }
            });
        });

        // Auto enable endpoint list if only one exists
        if (apiEndpointListBoxes.length === 1) {
            apiSelectBox.val(apiSelectBox.find('> [value!=""]').val()).change();
        }

        // Auto enable endpoint list if an api selection is designated as auto select
        if (apiSelectBox.find('> [data-auto-select=1]').length) {
            apiSelectBox.val(apiSelectBox.find('> [data-auto-select=1]').val()).change();
        }

        // Return master object
        return self;
    }());
});
