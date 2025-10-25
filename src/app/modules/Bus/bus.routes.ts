import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { BusValidations } from "./bus.validation";
import { BusController } from "./bus.controller";

const router = express.Router();

router.post(
  "/create-bus",
  validateRequest(BusValidations.createBusValidationSchema),
  BusController.createBus
);
router.get("/", BusController.getAllBuses);
router.get("/:busId", BusController.getSingleBus);
router.patch(
  "/:busId",
  validateRequest(BusValidations.updateBusValidationSchema),
  BusController.updateBus
);
router.delete("/:busId", BusController.deleteBus);

export const BusRouter = router;
