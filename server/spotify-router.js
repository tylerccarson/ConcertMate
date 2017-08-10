let router = require('express').Router();
let axios = require('axios');
let bodyParser = require('body-parser');

router.post('/', bodyParser.json(), (req, res) => {
	console.log(req.body);
	res.send('got artist post');
})

module.exports = router;