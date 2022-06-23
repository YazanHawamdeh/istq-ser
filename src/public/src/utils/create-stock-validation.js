export const validateStockCreate = (data) => {
  let error = {
    name: data.name ? '' : 'Name is required',
    amount: data.amount ? (data.amount < 0 ? `Amount can't be less than 0` : '') : 'Amount is required',
    description: data.description ? '' : 'Description is required',
  };

  let valid = true;
  Object.keys(error).map((item) => {
    if (error[item].length) valid = false;
  });
  return { error, valid };
};
