import * as c from 'colorette'

// Reset
let reset = "\x1B[37m"

let gray = (text: string) => {
  return c.gray(text) + reset
}

let yellow = (text: string) => {
  return c.yellow(text) + reset
}

let blue = (text: string) => {
  return c.blue(text) + reset
}

let bold = (text: string) => {
  return c.bold(text) + reset
}

export { gray, yellow, blue, bold }
