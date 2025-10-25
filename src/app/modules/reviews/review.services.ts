import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

const createReviewIntoDb = async (reviewData: TReview) => {
  const result = await reviewModel.create(reviewData);
  return result;
};

const getAllReviewsFromDb = async (query: Record<string, unknown>) => {
  let queryObj = { isDeleted: false };
  if (query?.status) {
    queryObj = { ...queryObj, ...query };
  }
  const result = await reviewModel.find(queryObj).sort({ createdAt: -1 });
  return result;
};

const getSingleReviewFromDb = async (id: string) => {
  const result = await reviewModel.findById(id);
  return result;
};

const updateReviewIntoDb = async (id: string, payload: Partial<TReview>) => {
  const result = await reviewModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteReviewFromDb = async (id: string) => {
  const result = await reviewModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ReviewServices = {
  createReviewIntoDb,
  getAllReviewsFromDb,
  getSingleReviewFromDb,
  updateReviewIntoDb,
  deleteReviewFromDb,
};
