import pino from 'pino';
import pretty from 'pino-pretty';
const stream = pretty({
  colorize: true,

  messageFormat: "\x1B[37m{msg}"
})
const logger = pino(stream)

export default logger;
