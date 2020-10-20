export const isValid = (val) => {
  if (val === null) {
    return false;
  }
  if (val === undefined) {
    return false;
  }
  return true;
};
