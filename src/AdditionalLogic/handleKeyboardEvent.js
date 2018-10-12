
const keyboardClickLogic = (event, type, callback) => {
  const keyboardCode = event.code;
  if (keyboardCode === type) {
    callback();
    console.log('working')
  }
  else {
      return
  }
};

export default keyboardClickLogic;