export const validateStockUpdate = (data) => {
  let error = {};
  if (Number(data.amount) < 0) error.amount = `Amount can't be negative`;
  if (data.name == '') error.name = `Name is required`;
  if (data.description == '') error.description = `Description is required`;

  let valid = true;
  Object.keys(error).map((item) => {
    if (error[item].length) valid = false;
  });
  return { error, valid };
};
