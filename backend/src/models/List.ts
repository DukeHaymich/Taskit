import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - title
 *         - board
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         title:
 *           type: string
 *           description: Title of the list
 *         board:
 *           type: string
 *           description: ID of the board this list belongs to
 *         cards:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of Card IDs in this list
 *         position:
 *           type: number
 *           description: Position of the list in the board
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
export interface IList extends Document {
  title: string;
  board: mongoose.Types.ObjectId;
  cards: mongoose.Types.ObjectId[];
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const ListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    position: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IList>("List", ListSchema);
