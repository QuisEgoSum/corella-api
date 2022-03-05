# Env list

| name                                               | description | type            | valid                           |
|----------------------------------------------------|-------------|-----------------|---------------------------------|
| CORELLA_API_PRODUCTION                             |             | boolean         |                                 |
| CORELLA_API_SERVER_HTTP_PROTOCOL                   |             | string          | enum: <br />-http;<br />-https. |
| CORELLA_API_SERVER_HTTP_ADDRESS                    |             | string          |                                 |
| CORELLA_API_SERVER_HTTP_HOST                       |             | string          |                                 |
| CORELLA_API_SERVER_HTTP_PORT                       |             | integer         | Range: 1...65353                |
| CORELLA_API_LOGGER_PRETTY                          |             | boolean         |                                 |
| CORELLA_API_LOGGER_ISO_TIME                        |             | boolean         |                                 |
| CORELLA_API_LOGGER_TIME                            |             | boolean         |                                 |
| CORELLA_API_LOGGER_LEVEL                           |             | string          | enum: <br />-info;<br />-debug. |
| CORELLA_API_USER_REGISTRATION                      |             | boolean         |                                 |
| CORELLA_API_USER_SESSION_MAXIMUM                   |             | integer         | Range: 1...                     |
| CORELLA_API_USER_SESSION_COOKIE_PATH               |             | string          |                                 |
| CORELLA_API_USER_SESSION_COOKIE_DOMAIN             |             | string          |                                 |
| CORELLA_API_USER_SESSION_COOKIE_SAME_SITE          |             | string, boolean |                                 |
| CORELLA_API_USER_SESSION_COOKIE_MAX_AGE            |             | integer         |                                 |
| CORELLA_API_USER_SUPERADMIN_PASSWORD               |             | string          | Length: 6...1024                |
| CORELLA_API_USER_SUPERADMIN_USERNAME               |             | string          | Length: 1...24                  |
| CORELLA_API_USER_SUPERADMIN_EMAIL                  |             | string          |                                 |
| CORELLA_API_DATABASE_CREDENTIALS_CONNECTION_STRING |             | string          |                                 |
| CORELLA_API_DATABASE_OPTIONS_USE_NEW_URL_PARSER    |             | boolean         |                                 |
| CORELLA_API_DATABASE_OPTIONS_USE_UNIFIED_TOPOLOGY  |             | boolean         |                                 |
| CORELLA_API_DATABASE_OPTIONS_IGNORE_UNDEFINED      |             | boolean         |                                 |
| CORELLA_API_DATABASE_OPTIONS_KEEP_ALIVE            |             | boolean         |                                 |
