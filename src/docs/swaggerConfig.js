const host = `${process.env.BASE_URL}:${process.env.PORT}` || 'http://localhost:9000';

const swaggerDefinition = {
    openapi: "3.0.3",
    info: {
        title: "API to perform authentication with JSON Web Token.",
        description: "The purpose of this API is to authenticate something using the JSON Web Token.",
        termsOfService: "https://github.com/shunny2/jwt-node",
        contact: {
            name: "API Support",
            email: "alexander.davis.098@gmail.com"
        },
        license: {
            name: "MIT License",
            url: "https://opensource.org/licenses/MIT"
        },
        version: "1.0.0"
    },
    servers: [
        {
            url: `${host}/api/v1`,
            description: "testing API"
        }
    ],
    paths: {
        "/auth": {
            get: {
                summary: "User authentication",
                description: "This route is responsible for verifying that you're authenticated.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Welcome to the API"
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    }
                }
            }
        },
        "/auth/login": {
            post: {
                summary: "User Sign in",
                description: "This route is responsible for signing in to the user, generating the token, and refreshing the token.",
                tags: [
                    "Auth"
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            message: "string",
                                            user: {
                                                _id: "string",
                                                name: "string",
                                                email: "string",
                                                createdAt: "string"
                                            },
                                            token: "string",
                                            refreshToken: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Bad request"
                    },
                    500: {
                        description: "Unable to register. There was an internal server error."
                    }
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            },
                            examples: {
                                user: {
                                    value: {
                                        email: "johndoe@gmail.com",
                                        password: "12345678"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/register": {
            post: {
                summary: "User Register",
                description: "This route is responsible for registering new users.",
                tags: [
                    "Auth"
                ],
                responses: {
                    201: {
                        description: "Created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            message: "string",
                                            user: {
                                                name: "string",
                                                email: "string",
                                                password: "string",
                                                _id: "string",
                                                createdAt: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    400: {
                        description: "Bad request"
                    },
                    500: {
                        description: "Unable to register. There was an internal server error."
                    }
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            },
                            examples: {
                                user: {
                                    value: {
                                        name: "John Doe",
                                        email: "johndoe@gmail.com",
                                        password: "12345678",
                                        confirmPassword: "12345678"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/refresh": {
            post: {
                summary: "Refresh Token",
                description: "This route is responsible for updating the user's token.",
                tags: [
                    "Auth"
                ],
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                examples: {
                                    token: {
                                        value: {
                                            message: "string",
                                            token: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    401: {
                        description: "Unauthorized"
                    },
                    403: {
                        description: "Forbidden"
                    },
                    500: {
                        description: "Unable to update. There was an internal server error."
                    }
                },
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    refreshToken: {
                                        type: "string"
                                    }
                                }
                            },
                            examples: {
                                refreshToken: {
                                    value: {
                                        refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMGIydGxiaUk2SW1WNVNtaGlSMk5wVDJsS1NWVjZTVEZPYVVselNXNVNOV05EU1RaSmEzQllWa05LT1M1bGVVcHdXa05KTmtscVdYcE9iVTE2VG5wTk5VNUVTVEJhUjFWNFdUSlplRnBFWXpKT2FtUnNUWGxKYzBsdFZuUlpWMnh6U1dwdmFWbFhlR3hsUjBaMVdrZFdlVXh0VW1oa2JXeDZVVWRrZEZsWGJITk1iVTUyWWxOSmMwbHROV2hpVjFWcFQybEtRbUpIVmpSWlZ6VnJXbGhKWjFKSFJqSmhXRTFwVEVOS2NGbFlVV2xQYWtVeVRtcG5kMDVFUlhwTlZGVnpTVzFXTkdORFNUWk5WRmt5VDBSQk1FMVVUWHBPV0RBdWNIaGtSRGhFWTAx"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/users": {
            get: {
                summary: "List all users",
                description: "This route is responsible for listing all registered users.",
                tags: [
                    "Users"
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User"
                                    }
                                },
                                examples: {
                                    user: {
                                        value: {
                                            users: [
                                                {
                                                    _id: "string",
                                                    name: "string",
                                                    email: "string",
                                                    password: "string",
                                                    createdAt: "string"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Could not load the user list. An internal server error has occurred."
                    }
                }
            }
        },
        "/users/{email}": {
            get: {
                summary: "Returns a user by email",
                description: "This route is responsible for returning a specific user based on the email provided.",
                tags: [
                    "Users"
                ],
                parameters: [
                    {
                        in: "path",
                        name: "email",
                        description: "Email of the user to get",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    $ref: "#/components/schemas/User"
                                },
                                examples: {
                                    user: {
                                        value: {
                                            user: {
                                                _id: "string",
                                                name: "string",
                                                email: "string",
                                                password: "string",
                                                createdAt: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    404: {
                        description: "This user does not exist."
                    },
                    500: {
                        description: "Error finding user. An internal server error has occurred."
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string"
                    },
                    name: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    createdAt: {
                        type: "string"
                    }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    }
};

module.exports = {
    swaggerDefinition,
    host,
    apis: [
        'src/routes/*.js'
    ]
}