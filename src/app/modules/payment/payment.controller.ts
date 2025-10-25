/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";
import axios from "axios";
import config from "../../config";
import { getToken } from "../../utils/paymentTokenManager";
import { generateTransactionId } from "../../utils/generateTxnId";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const SSLCommerzPayment = require("sslcommerz-lts");

const createPaymentToDbController = catchAsync(
  async (req: Request, res: Response) => {
    const paymentData = req.body;
    const result = await paymentServices.createPaymentIntoDb(paymentData);
    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  }
);

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentServices.getAllPaymentsFromDb();
  res.status(200).json({
    success: true,
    message: "All Payments retrieved successfully",
    data: result,
  });
});

const createPaymentController = catchAsync(
  async (req: Request, res: Response) => {
    const { amount } = req.body;

    const result = await paymentServices.createPayment(amount);
    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: result,
    });
  }
);

const callBackController = async (req: Request, res: Response) => {
  const id_token = getToken();
  const result = req.query;

  if (result?.status === "success") {
    try {
      const data = await axios.post(
        `${config.bkash_base_url}/execute`,

        { paymentID: result.paymentID },

        {
          headers: {
            Accept: "application/json",
            Authorization: id_token,
            "X-app-key": config.bkash_app_key,
          },
        }
      );
      if (data && data?.data?.statusCode === "0000") {
        res.redirect(
          `${config.client_url}/payment/success?trxID=${data?.data?.trxID}&message=${data?.data?.statusMessage}&paymentMethod=Bkash`
        );
      } else {
        res.redirect(
          `${config.client_url}/payment/error?message=${data?.data?.statusMessage}`
        );
      }
    } catch (error: any) {
      res.redirect(
        `${config.client_url}/payment/error?message=${error.message}`
      );
    }
  } else {
    res.redirect(`${config.client_url}/payment/error?message=${result.status}`);
  }
};

const initSslcommerz = catchAsync(async (req: Request, res: Response) => {
  const customer = req.body;
  const trxID = generateTransactionId();
  const data = {
    total_amount: customer?.totalPrice,
    currency: "BDT",
    tran_id: trxID, // use unique tran_id for each api call
    success_url: `${config.web_url}/payment/ssl/success/${trxID}`,
    fail_url: `${config.web_url}/payment/ssl/failed`,
    cancel_url: `${config.web_url}/payment/ssl/failed`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Ticket.",
    product_category: "Bus ticket",
    product_profile: "general",
    cus_name: customer?.name,
    cus_email: customer?.email || "no email",
    cus_add1: " ",
    cus_add2: " ",
    cus_city: " ",
    cus_state: " ",
    cus_postcode: " ",
    cus_country: "Bangladesh",
    cus_phone: customer?.contactNumber,
    cus_fax: " ",
    ship_name: " ",
    ship_add1: " ",
    ship_add2: " ",
    ship_city: " ",
    ship_state: " ",
    ship_postcode: 1000,
    ship_country: " ",
  };

  const sslcz = new SSLCommerzPayment(
    config.ssl_store_id,
    config.ssl_store_password,
    JSON.parse(config.ssl_is_live as string)
  );
  sslcz.init(data).then((apiResponse: any) => {
    // Redirect the user to payment gateway
    const GatewayPageURL = apiResponse.GatewayPageURL;

    res.status(200).json({
      success: true,
      message: "Payment created successfully",
      data: GatewayPageURL,
    });
  });
});

const sslSuccessController = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  res.redirect(
    `${config.client_url}/payment/success?trxID=${paymentData?.tran_id}&paymentMethod=${paymentData?.card_type}`
  );
});
const sslFailedController = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  res.redirect(
    `${config.client_url}/payment/error?message=${paymentData?.status}`
  );
});

export const PaymentController = {
  createPaymentToDbController,
  getAllPayments,
  createPaymentController,
  callBackController,
  initSslcommerz,
  sslSuccessController,
  sslFailedController,
};
