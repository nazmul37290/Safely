import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    name: {
      type: String,
      required: true,
    },
    personType: {
      type: String,
      enum: ["Student", "Parents"],
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const reviewModel = model<TReview>("Review", reviewSchema);
