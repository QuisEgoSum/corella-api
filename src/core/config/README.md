# Env list

| name                                            | description | type            | valid                           |
|-------------------------------------------------|-------------|-----------------|---------------------------------|
| UNTITLED_PRODUCTION                             |             | boolean         |                                 |
| UNTITLED_SERVER_HTTP_PROTOCOL                   |             | string          | enum: <br />-http;<br />-https. |
| UNTITLED_SERVER_HTTP_ADDRESS                    |             | string          |                                 |
| UNTITLED_SERVER_HTTP_HOST                       |             | string          |                                 |
| UNTITLED_SERVER_HTTP_PORT                       |             | integer         | Range: 1...65353                |
| UNTITLED_LOGGER_PRETTY                          |             | boolean         |                                 |
| UNTITLED_LOGGER_ISO_TIME                        |             | boolean         |                                 |
| UNTITLED_LOGGER_TIME                            |             | boolean         |                                 |
| UNTITLED_LOGGER_LEVEL                           |             | string          | enum: <br />-info;<br />-debug. |
| UNTITLED_USER_REGISTRATION                      |             | boolean         |                                 |
| UNTITLED_USER_SESSION_MAXIMUM                   |             | integer         | Range: 1...                     |
| UNTITLED_USER_SESSION_COOKIE_PATH               |             | string          |                                 |
| UNTITLED_USER_SESSION_COOKIE_DOMAIN             |             | string          |                                 |
| UNTITLED_USER_SESSION_COOKIE_SAME_SITE          |             | string, boolean |                                 |
| UNTITLED_USER_SESSION_COOKIE_MAX_AGE            |             | integer         |                                 |
| UNTITLED_USER_SUPERADMIN_PASSWORD               |             | string          | Length: 6...1024                |
| UNTITLED_USER_SUPERADMIN_USERNAME               |             | string          | Length: 1...24                  |
| UNTITLED_USER_SUPERADMIN_EMAIL                  |             | string          |                                 |
| UNTITLED_DATABASE_CREDENTIALS_CONNECTION_STRING |             | string          |                                 |
| UNTITLED_DATABASE_OPTIONS_USE_NEW_URL_PARSER    |             | boolean         |                                 |
| UNTITLED_DATABASE_OPTIONS_USE_UNIFIED_TOPOLOGY  |             | boolean         |                                 |
| UNTITLED_DATABASE_OPTIONS_IGNORE_UNDEFINED      |             | boolean         |                                 |
| UNTITLED_DATABASE_OPTIONS_KEEP_ALIVE            |             | boolean         |                                 |
