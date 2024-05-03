const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const catmodel = require('./model/categorymodel');
const loginmodel = require('./model/adminmodel');
const usermodel = require('./model/usermodel');
const cartmodel = require('./model/cartmodel');

const bcrypt = require('bcryptjs');
const multer = require('multer');
const productmodel = require('./model/productmodel');
const productordermodel = require('./model/productordermodel');
const orderdetailsmodel = require('./model/orderdetails');
const con = mongoose.connect("mongodb://127.0.0.1:27017/Eshopdb");
con.then(() => {
	console.log("Connection Done");
})
con.catch(() => {

	console.log("Error in Connection")
})
const app = express();
app.use(express.static("uploades"))
app.use(cors({ "origin": true, "credentials": true }));
app.use(express.json());
app.use(cookieParser());
app.post("/category", async (req, res) => {
	try {
		const catname = req.body.catname.trim();
		const rec = new catmodel({ catname: catname })
		if (catname === "") {
			res.json({ msg: "Please enter category name" });
		}
		else {
			const rec1 = await rec.save();
			if (rec1) {
				res.json({ msg: "New Category Added" });
			}
			else {
				res.json({ msg: "Technical Error" });
			}
		}
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}
})
app.get("/category", async (req, res) => {

	try {
		const data = await catmodel.find();
		res.json(data);
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}

})

app.get("/category/:id", async (req, res) => {
	try {
		const data = await catmodel.findOne({ _id: req.params.id });
		res.json(data);
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}
})
app.put("/category", async (req, res) => {
	try {
		const cid = req.body.cid;
		const catname = req.body.catname.trim();
		if (catname === "") {
			res.json({ msg: "Please enter category name" });
		}
		else {
			const data = await catmodel.findOneAndUpdate({ _id: cid }, { catname: catname });
			if (data) {
				res.json({ msg: "Record Updated" });
			}
			else {
				res.json({ msg: "Technical Error" });
			}
		}

	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}
})
app.delete("/category", async (req, res) => {
	try {
		const rec = await catmodel.findOneAndDelete({ _id: req.body.cid });
		if (rec) {
			res.json({ msg: "Record Deleted" });
		}
		else {
			res.json({ msg: "Technical Error" });
		}
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}
})

app.post("/login", async (req, res) => {
	const uname = req.body.uname.trim();
	const psw = req.body.psw.trim();
	const data = await loginmodel.findOne({ Username: uname })
	if (data) {
		if (psw === data.password) {
			res.cookie("cookiesdata", uname).json({ msg: "Valid Users" });
		}
		else {
			res.json({ msg: "Invalid Login" });
		}
	}
	else {
		res.json({ msg: "Invalid Login" });
	}
});

app.get("/profile", async (req, res) => {
	const rec = await loginmodel.find({ username: req.cookies.cookiesdata })
	res.json(rec);
});

const myfilter = (req, file, cb) => {
	const ext = file.mimetype.split('/')[1];
	if (ext === "jpg" || ext === "jpeg" || ext === "png") {
		cb(null, true)
	}
	else {
		cb("Please select image file only", false)
	}
}
const mystorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploades')
	},
	filename: function (req, file, cb) {
		const ext = file.mimetype.split('/')[1];
		cb(null, "pic_" + Date.now() + "." + ext)
	}
});


const upload = multer({
	storage: mystorage,
	fileFilter: myfilter
});
app.post("/adminproduct", upload.single("pro_pic"), async (req, res) => {

	let catid = req.body.catid;
	let pname = req.body.pname;
	let price = req.body.price;
	let offerprice = req.body.offerprice;
	let pic = req.file.filename;
	let desc = req.body.description;
	const rec = new productmodel({
		catid: catid, pname: pname, price: price, offerprice: offerprice, pic: pic, description: desc
	});
	const data = await rec.save();
	if (data) {
		res.json({ msg: "New Product Saved" });
	}
	else {
		res.json({ msg: "Something went wrong" })
	}

});

app.get("/adminproduct", async (req, res) => {
	const rec = await productmodel.find();
	res.json(rec);
});

app.post("/productbycat", async (req, res) => {
	const rec = await productmodel.find({ catid: req.body.catid })
	res.json(rec);
});

app.post("/signup", async (req, res) => {
	const name = req.body.name.trim();
	const email = req.body.email.trim();
	const mobile = req.body.mobile.trim();
	const password = await bcrypt.hash(req.body.password.trim(), 12);
	const rec = new usermodel({
		name: name,
		email: email,
		mobile: mobile,
		password: password
	});
	const data = await rec.save();
	res.json({ msg: "Saved" });
})

app.post("/signuplog", async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();
	const rec = await usermodel.find({ email: email });
	if (rec) {
		if (await bcrypt.compare(password, rec[0].password)) {
			res.cookie("usercookie", email).json({ msg: "Valid User" });
		}
		else {
			res.json({ msg: "Invalid User" });
		}
	}
	else {
		res.json({ msg: "Invalid Users" });
	}
})

app.post("/cart", async (req, res) => {
	const email = req.body.email;
	const pname = req.body.pname;
	const price = req.body.price;
	const offer = req.body.offer;
	const pic = req.body.pic;
	const pid = req.body.pid;
	const qty = "1";

	const rec = new cartmodel({
		email: email,
		pname: pname,
		price: price,
		offer: offer,
		pic: pic,
		qty: qty,
		pid: pid
	});
	const data = await rec.save();
	if (data) {
		res.json({ msg: "Saved" })
	}
	else {
		res.json({ msg: "Error" });
	}
})

app.get("/cart", async (req, res) => {
	const rec = await cartmodel.find({ email: req.cookies.usercookie});
	res.json(rec);
});

app.put("/cart", async (req, res) => {
	var fqty = parseInt(req.body.qty);
	console.log(fqty);
	if (req.body.opr === "plus") {
		fqty++;
	}
	else {
		fqty--;
	}
	var rec = "";
	if (fqty <= 0) {
		rec = await cartmodel.findOneAndDelete({ _id: req.body.cid })
	}
	else {
		rec = await cartmodel.findOneAndUpdate({ _id: req.body.cid }, { qty: fqty })
	}
	if (rec) {
		res.json({ msg: "Saved" })
	}
	else {
		res.json({ msg: "Technical Error" })
	}
})

app.get("/proorder", async (req, res) => {
	const rec = await productordermodel.find();
	res.json(rec);
});
app.get("/orderdetails/:id", async (req, res) => {
	const rec = await orderdetailsmodel.find({ orderno: req.params.id });
	res.json(rec);
})
app.post("/proorder", async (req, res) => {
	const email = req.cookies.usercookie;
	const mobile = req.body.mobile;
	const name = req.body.name;
	const address = req.body.address;
	const amount = req.body.amount;
	const dt = new Date();
	const orderdate = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getYear();
	const status = "Pending";
	const orderno = "ES-" + dt.getDate() + dt.getMonth() + dt.getYear() + dt.getMinutes() + dt.getSeconds() + dt.getMilliseconds();
	const paymentmode = "COD";
	const rec = new productordermodel({ name: name, email: email, mobile: mobile, address: address, orderstatus: status, orderdate: orderdate, orderno: orderno, amount: amount, paymentmode: paymentmode })
	const data = await rec.save();
	if (data) {
		const rec1 = await cartmodel.find({ email: req.cookies.usercookie });
		for (var i = 0; i < rec1.length; i++) {
			const rec2 = new orderdetailsmodel({
				orderno: orderno,
				pname: rec1[i].pname,
				price: rec1[i].offer,
				pic: rec1[i].pic,
				qty: rec1[i].qty
			});
			await rec2.save();
		}
		await cartmodel.deleteMany({ email: req.cookies.usercookie })
		res.json({ msg: "Order Placed" });
	}
	else {
		res.json({ msg: "Order cannot be placed" })
	}

})
app.listen(7000, () => {
	console.log("Server Started");
})
