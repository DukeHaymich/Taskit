import mongoose, { Schema, Document } from "mongoose";

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
