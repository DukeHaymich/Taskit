export const authRoutes = {
  register: {
    tags: ["Auth"],
    summary: "Register a new user",
    security: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password", "name"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
              name: { type: "string" },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "User successfully registered",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
                user: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
    },
  },
  login: {
    tags: ["Auth"],
    summary: "Login user",
    security: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "User successfully logged in",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
                user: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
  getCurrentUser: {
    tags: ["Auth"],
    summary: "Get current user",
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: "Current user details",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
};
