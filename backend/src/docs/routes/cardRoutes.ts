export const cardRoutes = {
  getCardsByList: {
    tags: ["Cards"],
    summary: "Get all cards for a list",
    parameters: [
      {
        in: "path",
        name: "listId",
        required: true,
        schema: {
          type: "string",
        },
        description: "List ID",
      },
    ],
    responses: {
      200: {
        description: "List of all cards in the list",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Card",
              },
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  createCard: {
    tags: ["Cards"],
    summary: "Create a new card",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["title", "list"],
            properties: {
              title: { type: "string" },
              list: { type: "string" },
              description: { type: "string" },
              position: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "The card was successfully created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Card",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
  updateCard: {
    tags: ["Cards"],
    summary: "Update a card",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "Card ID",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              list: { type: "string" },
              position: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "The card was updated",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Card",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  deleteCard: {
    tags: ["Cards"],
    summary: "Delete a card",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "Card ID",
      },
    ],
    responses: {
      200: { description: "Card was deleted" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
};
