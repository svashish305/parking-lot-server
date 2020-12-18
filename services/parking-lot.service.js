const db = require('../db');

const createParkingLot = async (noOfLot) => {
	let maxSize = parseInt(noOfLot);
	let availableSlots = [];
	let cars = [];
	for (let i = 1; i <= maxSize; i++) {
		availableSlots.push(i);
	}
	let obj = {
		maxSize,
		availableSlots,
		cars,
	};
	parkingLot = new db.ParkingLot(obj);
	await parkingLot.save();
	return `Created a parking lot with ${availableSlots.length} slots`;
};

const park = async (carNumber) => {
	let [parkingLot, ...others] = await db.ParkingLot.find();
	let { maxSize, availableSlots, cars } = parkingLot;
	if (maxSize === 0) {
		return `Parking Lot not found! Please generate one!`;
	} else if (maxSize === cars.length) {
		return `Sorry, parking lot is full`;
	} else {
		let slot = availableSlots[0];
		cars.push({
			slot: slot,
			carNumber: carNumber,
		});
		availableSlots.shift();
		await parkingLot.save();
		return `Allocated slot number: ${slot}`;
	}
};

const unpark = async (slot) => {
	slot = parseInt(slot);
	let [parkingLot, ...others] = await db.ParkingLot.find();
	let { maxSize, availableSlots, cars } = parkingLot;
	if (maxSize === 0) {
		return 'Parking Lot not found! Please generate one!';
	} else if (cars.length > 0) {
		if (cars.find((car) => car.slot === slot)) {
			parkingLot.cars = cars.filter((car) => car.slot !== slot);
			// Add a the number back into slot
			if (!availableSlots.find((sl) => sl === slot)) availableSlots.push(slot);
			availableSlots.sort();
			await parkingLot.save();
			return `Slot  numbmer ${slot} is free`;
		} else {
			return `Slot ${slot} is already empty `;
		}
	} else {
		return `Parking lot is empty`;
	}
};

const getCarNumberFromSlot = async (slot) => {
	let [parkingLot, ...others] = await db.ParkingLot.find();
	let { maxSize, cars } = parkingLot;
	if (maxSize === 0) {
		return 'Parking Lot not found! Please generate one!';
	} else if (cars.length > 0) {
		let foundCar = cars.find((car) => car.slot === parseInt(slot));
		return `Car Parked in slot no. ${slot} is ${foundCar.carNumber}`;
	} else {
		return `Not Found!`;
	}
};

const getSlotNumberFromCar = async (carNumber) => {
	let [parkingLot, ...others] = await db.ParkingLot.find();
	let { maxSize, cars } = parkingLot;
	if (maxSize === 0) {
		return 'Parking Lot not found! Please generate one!';
	} else if (cars.length > 0) {
		let foundCar = cars.find((car) => car.carNumber == carNumber);
		return `Car number ${carNumber} is parked in slot number ${foundCar.slot}`;
	} else {
		return `Not Found!`;
	}
};

module.exports = {
	createParkingLot,
	park,
	unpark,
	getCarNumberFromSlot,
	getSlotNumberFromCar,
};
