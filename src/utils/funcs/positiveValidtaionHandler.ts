const postiveValidationHandler = (errorMsg: string, value?: number) => {
  if (value) {
    return value > 0 || errorMsg;
  }
};

export default postiveValidationHandler;
