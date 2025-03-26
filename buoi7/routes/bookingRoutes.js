const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);
router.get("/booking/new", bookingController.getNewBookingForm);
router.post("/booking/create", bookingController.createBooking);
router.get("/booking/edit/:id", bookingController.getEditBookingForm);
router.post("/booking/update/:id", bookingController.updateBooking);
router.post("/booking/cancel/:id", bookingController.cancelBooking);
router.post('/booking/confirm/:id', bookingController.confirmBooking);

module.exports = router;
