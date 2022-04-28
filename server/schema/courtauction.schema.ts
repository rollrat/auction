import mongoose from "mongoose";

const courtauctionSchema = new mongoose.Schema(
  {
    info: {
      type: Object,
      courtName: { type: String },
      eventNumber: { type: String },
      appraisedValue: { type: String },
      minSellingPrice: { type: String },
      saleDate: { type: String },
    },
  },
  {
    collection: "docs",
  }
);

export const CourtauctionSchema = mongoose.model("ca", courtauctionSchema);