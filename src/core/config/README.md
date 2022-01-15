# Env list

| name                                                | description | type            | valid                           |
|-----------------------------------------------------|-------------|-----------------|---------------------------------|
| CORELLA__API_PRODUCTION                             |             | boolean         |                                 |
| CORELLA__API_SERVER_HTTP_PROTOCOL                   |             | string          | enum: <br />-http;<br />-https. |
| CORELLA__API_SERVER_HTTP_ADDRESS                    |             | string          |                                 |
| CORELLA__API_SERVER_HTTP_HOST                       |             | string          |                                 |
| CORELLA__API_SERVER_HTTP_PORT                       |             | integer         | Range: 1...65353                |
| CORELLA__API_LOGGER_PRETTY                          |             | boolean         |                                 |
| CORELLA__API_LOGGER_ISO_TIME                        |             | boolean         |                                 |
| CORELLA__API_LOGGER_TIME                            |             | boolean         |                                 |
| CORELLA__API_LOGGER_LEVEL                           |             | string          | enum: <br />-info;<br />-debug. |
| CORELLA__API_USER_REGISTRATION                      |             | boolean         |                                 |
| CORELLA__API_USER_SESSION_MAXIMUM                   |             | integer         | Range: 1...                     |
| CORELLA__API_USER_SESSION_COOKIE_PATH               |             | string          |                                 |
| CORELLA__API_USER_SESSION_COOKIE_DOMAIN             |             | string          |                                 |
| CORELLA__API_USER_SESSION_COOKIE_SAME_SITE          |             | string, boolean |                                 |
| CORELLA__API_USER_SESSION_COOKIE_MAX_AGE            |             | integer         |                                 |
| CORELLA__API_USER_SUPERADMIN_PASSWORD               |             | string          | Length: 6...1024                |
| CORELLA__API_USER_SUPERADMIN_USERNAME               |             | string          | Length: 1...24                  |
| CORELLA__API_USER_SUPERADMIN_EMAIL                  |             | string          |                                 |
| CORELLA__API_DATABASE_CREDENTIALS_CONNECTION_STRING |             | string          |                                 |
| CORELLA__API_DATABASE_OPTIONS_USE_NEW_URL_PARSER    |             | boolean         |                                 |
| CORELLA__API_DATABASE_OPTIONS_USE_UNIFIED_TOPOLOGY  |             | boolean         |                                 |
| CORELLA__API_DATABASE_OPTIONS_IGNORE_UNDEFINED      |             | boolean         |                                 |
| CORELLA__API_DATABASE_OPTIONS_KEEP_ALIVE            |             | boolean         |                                 |
