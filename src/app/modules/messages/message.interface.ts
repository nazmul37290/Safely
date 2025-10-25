export type TMessage = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Pending" | "Replied";
  isDeleted: boolean;
};
