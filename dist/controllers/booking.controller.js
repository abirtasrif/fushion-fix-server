"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const handle_error_1 = require("../errors/handle.error");
const booking_model_1 = __importDefault(require("../models/booking.model"));
const reapairPackage_model_1 = __importDefault(require("../models/reapairPackage.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class BookingController {
    constructor() { }
    async createABooking(req, res) {
        var _a, _b;
        try {
            const { rid } = req.params;
            if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.repair_package) {
                if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                    res.status(404).json({ message: 'Repair Package not found' });
                }
            }
            const user = await user_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id).populate('bookings');
            const alreadyBooked = user === null || user === void 0 ? void 0 : user.bookings.find((booking) => rid === booking.repairPackage._id.toString());
            if (alreadyBooked) {
                res.status(403).json({ message: 'Package already booked' });
                return;
            }
            await Promise.resolve().then(async () => {
                var _a, _b;
                const booking = await booking_model_1.default.create({
                    repairPackage: rid,
                    user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                });
                await reapairPackage_model_1.default.findByIdAndUpdate(rid, {
                    $addToSet: {
                        bookings: booking._id,
                    },
                });
                await user_model_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
                    $addToSet: {
                        bookings: booking._id,
                    },
                });
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteABooking(req, res) {
        var _a, _b;
        try {
            const { bid } = req.params;
            if ((_a = req.query) === null || _a === void 0 ? void 0 : _a.repair_package) {
                if (!mongoose_1.default.Types.ObjectId.isValid(bid)) {
                    res.status(404).json({ message: 'Booking not found' });
                }
            }
            const user = await user_model_1.default.findById((_b = req.user) === null || _b === void 0 ? void 0 : _b._id);
            const matchedBooking = user === null || user === void 0 ? void 0 : user.bookings.find((booking) => bid === booking._id);
            if (!matchedBooking) {
                res.status(403).json({
                    message: "Booking doesn't exist",
                });
            }
            await Promise.resolve().then(async () => {
                const booking = await booking_model_1.default.findByIdAndDelete(bid);
                res.status(200).json(booking);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getAllBooking(req, res) {
        try {
            const bookings = await booking_model_1.default.find({});
            res.status(200).json(bookings);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = BookingController;
