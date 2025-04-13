export const listRoutes = {
  getListsByBoard: {
    tags: ["Lists"],
    summary: "Get all lists for a board",
    parameters: [
      {
        in: "path",
        name: "boardId",
        required: true,
        schema: {
          type: "string",
        },
        description: "Board ID",
      },
    ],
    responses: {
      200: {
        description: "List of all lists in the board",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/List",
              },
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  createList: {
    tags: ["Lists"],
    summary: "Create a new list",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["title", "board"],
            properties: {
              title: { type: "string" },
              board: { type: "string" },
              position: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "The list was successfully created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/List",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
  updateList: {
    tags: ["Lists"],
    summary: "Update a list",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "List ID",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              position: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "The list was updated",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/List",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  deleteList: {
    tags: ["Lists"],
    summary: "Delete a list",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "List ID",
      },
    ],
    responses: {
      200: { description: "List was deleted" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
};
