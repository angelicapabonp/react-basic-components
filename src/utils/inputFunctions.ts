export const onKeyPressNumbers = (event: any, callback?: (event: any) => void) => {
  if (!/^\d+$/.test(event.key)) {
    event.preventDefault();
  }

  callback && callback(event);
};

export const onKeyPressByRegEx = (event: any, regEx: any, callback?: (event: any) => void) => {
  if (!regEx.test(event.key)) {
    event.preventDefault();
  }

  callback && callback(event);
};
