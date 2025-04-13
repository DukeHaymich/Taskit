import swaggerJsdoc from "swagger-jsdoc";
import {
  authRoutes,
  boardRoutes,
  listRoutes,
  cardRoutes,
} from "../docs/routes";
import { schemas, securitySchemes, responses } from "../docs/components";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trello Clone API",
      version: "1.0.0",
      description: "API documentation for Trello Clone application",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
    components: {
      schemas,
      securitySchemes,
      responses,
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      "/auth/register": {
        post: authRoutes.register,
      },
      "/auth/login": {
        post: authRoutes.login,
      },
      "/auth/me": {
        get: authRoutes.getCurrentUser,
      },
      "/boards": {
        get: boardRoutes.getBoards,
        post: boardRoutes.createBoard,
      },
      "/boards/{id}": {
        get: boardRoutes.getBoardById,
        patch: boardRoutes.updateBoard,
        delete: boardRoutes.deleteBoard,
      },
      "/boards/{boardId}/lists": {
        get: listRoutes.getListsByBoard,
        post: listRoutes.createList,
      },
      "/lists/{id}": {
        patch: listRoutes.updateList,
        delete: listRoutes.deleteList,
      },
      "/lists/{listId}/cards": {
        get: cardRoutes.getCardsByList,
        post: cardRoutes.createCard,
      },
      "/cards/{id}": {
        patch: cardRoutes.updateCard,
        delete: cardRoutes.deleteCard,
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpecs = swaggerJsdoc(options);
