import * as c from 'colorette';

// Reset
const reset = '\x1B[37m';

const gray = (text: string) => {
  return c.gray(text) + reset;
};

const yellow = (text: string) => {
  return c.yellow(text) + reset;
};

const blue = (text: string) => {
  return c.blue(text) + reset;
};

const bold = (text: string) => {
  return c.bold(text) + reset;
};

export { blue, bold, gray, yellow };
