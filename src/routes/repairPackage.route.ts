import express, { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import RepairPackageController from '../controllers/repairPackage.controller';

const repairPackageRouter: Router = express.Router();

const authInstance = new AuthMiddleware();
const repairPackageInstance = new RepairPackageController();

//get all packages
repairPackageRouter.get('/', repairPackageInstance.getAllRepairPackages);

//get a single package
repairPackageRouter.get('/:rid', repairPackageInstance.getARepairPackage);

//create a single package
repairPackageRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  repairPackageInstance.createARepairPackage
);

// update a single package
repairPackageRouter.put(
  '/:rid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  repairPackageInstance.updateARepairPackage
);

// delete a single package
repairPackageRouter.delete(
  '/:rid',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  repairPackageInstance.deleteARepairPackage
);

export default repairPackageRouter;
