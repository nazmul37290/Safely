export type TBlog = {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: "Published" | "Draft";
  isDeleted: boolean;
};
