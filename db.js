const config = require('./config.json');
require('dotenv').config();
const mongoose = require('mongoose');

const connectionOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};
mongoose.connect(
	process.env.MONGODB_URI || config.connectionString,
	connectionOptions
);
// mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established');
});

module.exports = {
	ParkingLot: require('./models/parking-lot.model'),
};
