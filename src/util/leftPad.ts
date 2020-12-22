const leftPad = (text: any, length: number, pad: string = "0") => {
  if (pad === undefined || pad === null || pad.length !== 1)
    throw Error("Invalid pad, must be single character string");

  text = text.toString();

  while (text.length < length) {
    text = pad + text;
  }

  return text;
};

export default leftPad;
