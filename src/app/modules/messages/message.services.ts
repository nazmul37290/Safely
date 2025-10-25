import { TMessage } from "./message.interface";
import { messageModel } from "./message.model";

const createMessageIntoDb = async (messageData: TMessage) => {
  const result = await messageModel.create(messageData);
  return result;
};

const getAllMessagesFromDb = async (query: Record<string, unknown>) => {
  let queryObj = { isDeleted: false };
  if (query?.status) {
    queryObj = { ...queryObj, ...query };
  }
  const result = await messageModel.find(queryObj).sort({ createdAt: -1 });
  return result;
};

const getSingleMessageFromDb = async (id: string) => {
  const result = await messageModel.findById(id);
  return result;
};

const updateMessageIntoDb = async (id: string, payload: Partial<TMessage>) => {
  const result = await messageModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteMessageFromDb = async (id: string) => {
  const result = await messageModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const MessageServices = {
  createMessageIntoDb,
  getAllMessagesFromDb,
  getSingleMessageFromDb,
  updateMessageIntoDb,
  deleteMessageFromDb,
};
