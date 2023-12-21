"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const repairPackage_controller_1 = __importDefault(require("../controllers/repairPackage.controller"));
const repairPackageRouter = express_1.default.Router();
const authInstance = new auth_middleware_1.default();
const repairPackageInstance = new repairPackage_controller_1.default();
//get all packages
repairPackageRouter.get('/', repairPackageInstance.getAllRepairPackages);
//get a single package
repairPackageRouter.get('/:rid', repairPackageInstance.getARepairPackage);
//create a single package
repairPackageRouter.post('/', authInstance.isAuthenticated, authInstance.isAdmin, repairPackageInstance.createARepairPackage);
// update a single package
repairPackageRouter.put('/:rid', authInstance.isAuthenticated, authInstance.isAdmin, repairPackageInstance.updateARepairPackage);
// delete a single package
repairPackageRouter.delete('/:rid', authInstance.isAuthenticated, authInstance.isAdmin, repairPackageInstance.deleteARepairPackage);
exports.default = repairPackageRouter;
