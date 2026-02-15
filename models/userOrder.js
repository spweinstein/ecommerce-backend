import mongoose from "mongoose";

const userOrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    shopOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShopOrder",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual to compute total from shop orders
userOrderSchema.virtual("total").get(function () {
  if (!this.shopOrders || this.shopOrders.length === 0) return 0;

  // If shopOrders are populated, compute from subtotals
  if (this.shopOrders[0].subtotal !== undefined) {
    return this.shopOrders.reduce(
      (sum, shopOrder) => sum + shopOrder.subtotal,
      0,
    );
  }

  // If not populated, return 0 (will need to populate to get total)
  return 0;
});

// Virtual to compute overall status based on shop orders
userOrderSchema.virtual("status").get(function () {
  // This would be populated when shopOrders are populated
  if (!this.shopOrders || this.shopOrders.length === 0) return this.status;

  const statuses = this.shopOrders.map((so) => so.status);

  if (statuses.every((s) => s === "delivered")) return "delivered";
  if (statuses.every((s) => s === "cancelled")) return "cancelled";
  if (statuses.some((s) => s === "shipped")) return "shipped";
  if (statuses.some((s) => s === "processing")) return "processing";

  return "pending";
});

export default mongoose.model("UserOrder", userOrderSchema);
