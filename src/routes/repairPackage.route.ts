import express, { Router } from 'express';

const repairPackageRouter: Router = express.Router();

//get all packages
repairPackageRouter.get('/');

//get a single package
repairPackageRouter.get('/:rid');

//create a single package
repairPackageRouter.post('/');

// update a single package
repairPackageRouter.put('/:rid');

// delete a single package
repairPackageRouter.delete('/:rid');

export default repairPackageRouter;
