require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const limiter = rateLimit({
	windowMs: 10 * 1000, // 10 seconds
	max: 10, // limit each IP to 10 requests per windowMs
});

app.use(limiter);

app.use('/api/parking-lots', require('./controllers/parking-lot.controller'));
if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'staging'
) {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port =
	process.env.NODE_ENV === 'production' ? process.env.PORT || 80 : 4000;
app.listen(port, () => {
	console.log('Server listening on port ' + port);
});
