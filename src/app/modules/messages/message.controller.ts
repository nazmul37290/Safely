import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { MessageServices } from "./message.services";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const messageData = req.body;
  const result = await MessageServices.createMessageIntoDb(messageData);
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
    data: result,
  });
});
const getAllMessages = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await MessageServices.getAllMessagesFromDb(query);
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "All messages retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No messages found",
      data: null,
    });
  }
});
const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await MessageServices.getSingleMessageFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Message retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Message not found",
      data: null,
    });
  }
});

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await MessageServices.updateMessageIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Message not found",
      data: null,
    });
  }
});
const deleteMessage = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await MessageServices.deleteMessageFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Messages deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Message not found",
      data: null,
    });
  }
});

export const MessageController = {
  createMessage,
  getAllMessages,
  getSingleMessage,
  updateMessage,
  deleteMessage,
};
