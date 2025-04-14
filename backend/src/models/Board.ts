import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  title: string;
  owner: mongoose.Types.ObjectId;
  description?: string;
  lists: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  backgroundColor?: string;
}

const BoardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
    backgroundColor: {
      type: String,
      trim: true,
      default: "#0076A8",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBoard>("Board", BoardSchema);
