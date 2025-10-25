import express from "express";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidations } from "./review.validation";
import { upload } from "../../utils/uploadFile";

const router = express.Router();

router.post(
  "/create-review",
  upload.single("image"),
  validateRequest(ReviewValidations.createReviewValidationSchema),
  ReviewController.createReview
);
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getSingleReview);
router.patch(
  "/:id",
  validateRequest(ReviewValidations.updateReviewValidationSchema),
  ReviewController.updateReview
);
router.delete("/:id", ReviewController.deleteReview);

export const ReviewRouter = router;
