const express =require('express')
const categorymodel=require("./model/categorymodel")

const categoryrouter=express.Router()

categoryrouter.post("/", async (req, res) => {
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
categoryrouter.get("/", async (req, res) => {

	try {
		const data = await catmodel.find();
		res.json(data);
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}

})
categoryrouter.get("/:id", async (req, res) => {
	try {
		const data = await catmodel.findOne({ _id: req.params.id });
		res.json(data);
	}
	catch (e) {
		res.json({ msg: "Technical Error" });
	}
})
categoryrouter.put("/", async (req, res) => {
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
categoryrouter.delete("/", async (req, res) => {
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

module.exports=categoryrouter;