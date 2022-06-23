export const validateUserLogin = (data) => {
  let error = {
    username:
      data.username?.split(' ').length > 1
        ? `User name Can't have space`
        : data.username?.length >= 5
        ? ''
        : 'User name should be at least 6 character',
    password: data.password?.length >= 6 ? '' : 'Password should be at least 6 character',
  };

  let valid = true;
  Object.keys(error).map((item) => {
    if (error[item].length) valid = false;
  });
  return { error, valid };
};
