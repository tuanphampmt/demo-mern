var express = require("express");
var router = express.Router();
const User = require("../models/user");
/* GET home page. */
router.get("/", function(req, res, next) {
	res.render("index", { title: "Express" });
});

router.get("/api/user", async (req, res, next) => {
	const user = await User.find({});
	res.json({ dataUser: user });
});

router.post("/api/add", async (req, res, next) => {
	const newUser = new User(req.body);
	await newUser.save();
	res.send("da nhan duoc");
});

router.post("/api/update/:id", async (req, res, next) => {
	const id = req.params.id;
	await User.updateOne({_id: id}, {$set: req.body})
});
router.post("/api/delete/:id", async (req, res, next) => {
	const id = req.params.id;
	await User.findByIdAndRemove(id);
	
});
module.exports = router;
