import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import RepairPackageModel from '../models/reapairPackage.model';
import mongoose from 'mongoose';

export default class RepairPackageController {
  constructor() {}

  public async getAllRepairPackages(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const repairPackages = await RepairPackageModel.find({});

        res.status(200).json(repairPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async getARepairPackage(req: Request, res: Response): Promise<void> {
    try {
      const { rid } = req.params;

      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Repair Package not found' });
      }

      await Promise.resolve().then(async () => {
        const repairPackages = await RepairPackageModel.findById(rid);

        res.status(200).json(repairPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async createARepairPackage(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, category, images, price } = req.body;

      await Promise.resolve().then(async () => {
        const repairPackages = await RepairPackageModel.create({
          title,
          description,
          category,
          images,
          price,
        });

        res.status(200).json(repairPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async updateARepairPackage(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, category, images, price } = req.body;
      const { rid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Repair Package not found' });
      }

      await Promise.resolve().then(async () => {
        const repairPackages = await RepairPackageModel.findByIdAndUpdate(
          rid,
          {
            title,
            description,
            category,
            images,
            price,
          },
          { new: true }
        );

        res.status(200).json(repairPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async deleteARepairPackage(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { title, description, category, images, price } = req.body;
      const { rid } = req.params;
      if (!mongoose.Types.ObjectId.isValid(rid)) {
        res.status(404).json({ message: 'Repair Package not found' });
      }

      await Promise.resolve().then(async () => {
        const repairPackages = await RepairPackageModel.findByIdAndDelete(rid);

        res.status(200).json(repairPackages);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
