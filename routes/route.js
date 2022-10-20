const express = require('express');
const router = express.Router();

const transcontroller = require("../controllers/controller")

router.post("/api/translate",transcontroller.translator)


module.exports = router;