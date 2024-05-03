const mongoose = require('mongoose');
const productmodel = mongoose.model("adminproducts", new mongoose.Schema({
	catid: { type: String, required: true },
	pname: { type: String, required: true },
	price: { type: String, required: true },
	offerprice: { type: String, required: true },
	pic: { type: String, required: true },
	description: { type: String, required: true }
}));
module.exports = productmodel;