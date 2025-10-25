export const generateTransactionId = (): string => {
  const prefix = "TXN";
  const timestamp = Date.now(); // milliseconds since epoch
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `${prefix}${timestamp}${random}`;
};
