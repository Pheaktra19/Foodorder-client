const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  imageUrl: {
    type: String,
  },
  shop: {
    type: String,
  },
});

productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", productSchema);
