import express from "express";
import { PaymentController } from "./payment.controller";
import bkashGrantTokenAuth from "../../middlewares/bkashGrantTokenAuth";

const router = express.Router();

router.post("/create-payment", PaymentController.createPaymentToDbController);
router.get("/", PaymentController.getAllPayments);
router.post(
  "/bkash/create",
  bkashGrantTokenAuth,
  PaymentController.createPaymentController
);
router.get("/bkash/callback", PaymentController.callBackController);

// sslcommerz related routes

router.post("/ssl/init", PaymentController.initSslcommerz);
router.post("/ssl/success/:trxID", PaymentController.sslSuccessController);
router.post("/ssl/failed", PaymentController.sslFailedController);

export const PaymentRoutes = router;
