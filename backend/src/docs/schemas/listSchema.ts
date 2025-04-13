export const listSchema = {
  List: {
    type: "object",
    required: ["title", "board"],
    properties: {
      _id: {
        type: "string",
        description: "Auto-generated MongoDB ID",
      },
      title: {
        type: "string",
        description: "Title of the list",
      },
      board: {
        type: "string",
        description: "ID of the board this list belongs to",
      },
      cards: {
        type: "array",
        description: "Array of card IDs in this list",
        items: {
          type: "string",
        },
      },
      position: {
        type: "number",
        description: "Position of the list in the board",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the list was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the list was last updated",
      },
    },
  },
};
