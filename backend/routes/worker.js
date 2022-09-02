const express = require("express");
const router = express.Router();
const db = require("../database/db");
const userController = require("../controllers/userController");

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM worker", (err, results) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

router.post("/create", (req, res) => {
	let data = { name: req.body.name, phone: req.body.phone, category: req.body.category, location: req.body.location, date: req.body.date };
	let sql = "INSERT INTO worker SET ?";
	let query = db.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "New Record is Added successfully" }));
	});
});

router.get("/:id", (req, res) => {
	let sql = "SELECT * FROM worker WHERE id=" + req.params.id;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});

 
router.get("/category/:category", (req, res) => {
	 
	let sql = `SELECT * FROM worker WHERE category='${req.params.category}'`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: result }));
	});
});


router.delete("/delete/:id", (req, res) => {
	let sql = "DELETE FROM worker WHERE id=" + req.params.id + "";
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record deleted successfully" }));
	});
});

router.put("/update/:id", (req, res) => {
 
	let sql = "UPDATE worker SET name='" + req.body.name + "', phone='" + req.body.phone + "', category='" + req.body.category + "', location='" + req.body.location + "', date='" + req.body.date + "' WHERE id=" + req.params.id;
	console.log(sql);
  let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ status: 200, error: null, response: "Record updated SuccessFully" }));
	});
});
 

module.exports = router;
