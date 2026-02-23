import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
    amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Sale", saleSchema);