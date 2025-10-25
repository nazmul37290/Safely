import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewServices } from "./blog.services";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body;
  const file = req.file;
  reviewData.ratings = Number(reviewData.ratings);
  reviewData.image = `${file?.path}`;
  const result = await ReviewServices.createReviewIntoDb(reviewData);
  res.status(200).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });
});
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await ReviewServices.getAllReviewsFromDb(query);
  if (result?.length) {
    res.status(200).json({
      success: true,
      message: "All Reviews retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "No Reviews found",
      data: null,
    });
  }
});
const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewServices.getSingleReviewFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Review not found",
      data: null,
    });
  }
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await ReviewServices.updateReviewIntoDb(id, updatedData);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Review not found",
      data: null,
    });
  }
});
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ReviewServices.deleteReviewFromDb(id);
  if (result) {
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Review not found",
      data: null,
    });
  }
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
