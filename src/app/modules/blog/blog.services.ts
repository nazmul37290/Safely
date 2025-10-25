import { TBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

const createBlogIntoDb = async (blogData: TBlog) => {
  const result = await blogModel.create(blogData);
  return result;
};

const getAllBlogsFromDb = async (query: Record<string, unknown>) => {
  let queryObj = { isDeleted: false };
  if (query?.status) {
    queryObj = { ...queryObj, ...query };
  }
  const result = await blogModel.find(queryObj).sort({ createdAt: -1 });
  return result;
};

const getSingleReviewFromDb = async (id: string) => {
  const result = await blogModel.findById(id);
  return result;
};

const updateReviewIntoDb = async (id: string, payload: Partial<TBlog>) => {
  const result = await blogModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteReviewFromDb = async (id: string) => {
  const result = await blogModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ReviewServices = {
  createReviewIntoDb: createBlogIntoDb,
  getAllReviewsFromDb: getAllBlogsFromDb,
  getSingleReviewFromDb,
  updateReviewIntoDb,
  deleteReviewFromDb,
};
