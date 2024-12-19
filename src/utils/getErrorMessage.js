export function getErrorMessage(error) {
  if (error) return error.message;
  return String(error);
}
