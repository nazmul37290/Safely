import express from "express";
import { MessageController } from "./message.controller";
import validateRequest from "../../middlewares/validateRequest";
import { MessageValidations } from "./message.validation";

const router = express.Router();

router.post(
  "/create-message",
  validateRequest(MessageValidations.createMessageValidationSchema),
  MessageController.createMessage
);
router.get("/", MessageController.getAllMessages);
router.get("/:id", MessageController.getSingleMessage);
router.patch("/:id", MessageController.updateMessage);
router.delete("/:id", MessageController.deleteMessage);

export const MessageRouter = router;
