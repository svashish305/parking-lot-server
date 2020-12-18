require('dotenv').config();
const express = require('express');
const router = express.Router();
const parkingLotService = require('../services/parking-lot.service');

router.post('/', createParkingLot);
router.post('/park', parkCar);
router.post('/unpark', unparkCar);
router.get('/info', getSlotOrCarNumber);

module.exports = router;

function createParkingLot(req, res, next) {
	if (req.body) {
		const { noOfSlots } = req.body;
		console.log(noOfSlots);
		parkingLotService
			.createParkingLot(noOfSlots)
			.then((resp) => res.json(resp))
			.catch(next);
	} else {
		parkingLotService
			.createParkingLot(process.env.PARKING_LOT_SIZE)
			.then((resp) => res.json(resp))
			.catch(next);
	}
}

function parkCar(req, res, next) {
	const { carNumber } = req.body;
	parkingLotService
		.park(carNumber)
		.then((resp) => res.json(resp))
		.catch(next);
}

function unparkCar(req, res, next) {
	const { slotNumber } = req.body;
	parkingLotService
		.unpark(slotNumber)
		.then((resp) => res.json(resp))
		.catch(next);
}

function getSlotOrCarNumber(req, res, next) {
	const { number } = req.query;
	let type = number.split('_')[0].toLowerCase();
	let no = number.split('_')[1];
	if (type === 'car') {
		parkingLotService
			.getSlotNumberFromCar(no)
			.then((resp) => res.json(resp))
			.catch(next);
	} else if (type === 'slot') {
		parkingLotService
			.getCarNumberFromSlot(no)
			.then((resp) => res.json(resp))
			.catch(next);
	}
}
