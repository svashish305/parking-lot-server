require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ParkingLot = new Schema({
	maxSize: {
		type: Number,
	},
	availableSlots: [{ type: Number }],
	cars: [
		{
			slot: {
				type: Number,
			},
			carNumber: {
				type: String,
			},
		},
	],
});

module.exports = mongoose.model('ParkingLot', ParkingLot);
