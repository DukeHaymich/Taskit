export const boardSchema = {
  Board: {
    type: "object",
    required: ["title"],
    properties: {
      _id: {
        type: "string",
        description: "Auto-generated MongoDB ID",
      },
      title: {
        type: "string",
        description: "Title of the board",
      },
      description: {
        type: "string",
        description: "Description of the board",
      },
      owner: {
        $ref: "#/components/schemas/User",
        description: "User who owns this board",
      },
      lists: {
        type: "array",
        description: "Array of lists in this board",
        items: {
          $ref: "#/components/schemas/List",
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the board was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the board was last updated",
      },
    },
    example: {
      _id: "507f1f77bcf86cd799439012",
      title: "Project X",
      description: "Main project board",
      owner: {
        _id: "507f1f77bcf86cd799439011",
        name: "John Doe",
        email: "john@example.com",
      },
      lists: [
        {
          _id: "507f1f77bcf86cd799439013",
          title: "To Do",
          cards: [],
          position: 0,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      ],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
};
