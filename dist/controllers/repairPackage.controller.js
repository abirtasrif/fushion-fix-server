"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const reapairPackage_model_1 = __importDefault(require("../models/reapairPackage.model"));
const mongoose_1 = __importDefault(require("mongoose"));
class RepairPackageController {
    constructor() { }
    async getAllRepairPackages(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const repairPackages = await reapairPackage_model_1.default.find({});
                res.status(200).json(repairPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async getARepairPackage(req, res) {
        try {
            const { rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Repair Package not found' });
            }
            await Promise.resolve().then(async () => {
                const repairPackages = await reapairPackage_model_1.default.findById(rid);
                res.status(200).json(repairPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async createARepairPackage(req, res) {
        try {
            const { title, description, category, images, price } = req.body;
            await Promise.resolve().then(async () => {
                const repairPackages = await reapairPackage_model_1.default.create({
                    title,
                    description,
                    category,
                    images,
                    price,
                });
                res.status(200).json(repairPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async updateARepairPackage(req, res) {
        try {
            const { title, description, category, images, price } = req.body;
            const { rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Repair Package not found' });
            }
            await Promise.resolve().then(async () => {
                const repairPackages = await reapairPackage_model_1.default.findByIdAndUpdate(rid, {
                    title,
                    description,
                    category,
                    images,
                    price,
                }, { new: true });
                res.status(200).json(repairPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async deleteARepairPackage(req, res) {
        try {
            const { rid } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(rid)) {
                res.status(404).json({ message: 'Repair Package not found' });
            }
            await Promise.resolve().then(async () => {
                const repairPackages = await reapairPackage_model_1.default.findByIdAndDelete(rid);
                res.status(200).json(repairPackages);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = RepairPackageController;
