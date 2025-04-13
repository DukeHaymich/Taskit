export const boardRoutes = {
  getBoards: {
    tags: ["Boards"],
    summary: "Get all boards",
    responses: {
      200: {
        description: "List of all boards",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Board",
              },
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
  getBoardById: {
    tags: ["Boards"],
    summary: "Get a board by id",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "Board ID",
      },
    ],
    responses: {
      200: {
        description: "Board details with its lists",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Board",
            },
          },
        },
      },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  createBoard: {
    tags: ["Boards"],
    summary: "Create a new board",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["title"],
            properties: {
              title: { type: "string" },
              description: { type: "string" },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "The board was successfully created",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Board",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
    },
  },
  updateBoard: {
    tags: ["Boards"],
    summary: "Update a board",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "Board ID",
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
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "The board was updated",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Board",
            },
          },
        },
      },
      400: { $ref: "#/components/responses/ValidationError" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
  deleteBoard: {
    tags: ["Boards"],
    summary: "Delete a board",
    parameters: [
      {
        in: "path",
        name: "id",
        required: true,
        schema: {
          type: "string",
        },
        description: "Board ID",
      },
    ],
    responses: {
      200: { description: "Board was deleted" },
      401: { $ref: "#/components/responses/UnauthorizedError" },
      404: { $ref: "#/components/responses/NotFoundError" },
    },
  },
};
