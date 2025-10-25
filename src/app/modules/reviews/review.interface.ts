export type TReview = {
  name: string;
  personType: "Student" | "Parents";
  image?: string;
  message: string;
  ratings: number;
  status: "Pending" | "Approved";
  isDeleted: boolean;
};
