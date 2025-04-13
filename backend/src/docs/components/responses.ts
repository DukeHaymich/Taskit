import {
  unauthorizedError,
  notFoundError,
  validationError,
} from "../responses";

export const responses = {
  ...unauthorizedError,
  ...notFoundError,
  ...validationError,
};
