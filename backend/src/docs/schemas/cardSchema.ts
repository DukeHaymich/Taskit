export const cardSchema = {
  Card: {
    type: "object",
    required: ["title", "list"],
    properties: {
      _id: {
        type: "string",
        description: "Auto-generated MongoDB ID",
      },
      title: {
        type: "string",
        description: "Title of the card",
      },
      description: {
        type: "string",
        description: "Description of the card",
      },
      list: {
        type: "string",
        description: "ID of the list this card belongs to",
      },
      position: {
        type: "number",
        description: "Position of the card in the list",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the card was created",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        description: "Timestamp when the card was last updated",
      },
    },
  },
};
