export const userSchema = {
  User: {
    type: "object",
    required: ["email", "name"],
    properties: {
      _id: {
        type: "string",
        description: "Auto-generated MongoDB ID",
      },
      email: {
        type: "string",
        format: "email",
        description: "User's email address",
      },
      name: {
        type: "string",
        description: "User's full name",
      },
      boards: {
        type: "array",
        description: "Array of boards owned by this user",
        items: {
          $ref: "#/components/schemas/Board",
        },
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the user was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the user was last updated",
      },
    },
    example: {
      _id: "507f1f77bcf86cd799439011",
      email: "john@example.com",
      name: "John Doe",
      boards: [
        {
          _id: "507f1f77bcf86cd799439012",
          title: "Project X",
          description: "Main project board",
          lists: [],
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        },
      ],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
  },
};
