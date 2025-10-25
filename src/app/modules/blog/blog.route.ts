import express from "express";
import { ReviewController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";
import { upload } from "../../utils/uploadFile";

const router = express.Router();

router.post(
  "/create-review",
  upload.single("image"),
  validateRequest(BlogValidations.createBlogValidationSchema),
  ReviewController.createReview
);
router.get("/", ReviewController.getAllReviews);
router.get("/:id", ReviewController.getSingleReview);
router.patch(
  "/:id",
  validateRequest(BlogValidations.updateBlogValidationSchema),
  ReviewController.updateReview
);
router.delete("/:id", ReviewController.deleteReview);

export const ReviewRouter = router;
