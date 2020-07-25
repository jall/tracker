export interface LogContext {
  error?: Error
  [k: string]: unknown
}

export interface Logger {
  debug: (message: string, context?: LogContext) => void
  info: (message: string, context?: LogContext) => void
  warn: (message: string, context?: LogContext) => void
  error: (message: string, context?: LogContext) => void
  fatal: (message: string, context?: LogContext) => void
}

const log: Logger = {
  debug: (message, context) => console.log(`DEBUG: ${message}`, context),
  info: (message, context) => console.log(`INFO: ${message}`, context),
  warn: (message, context) => console.warn(`WARN: ${message}`, context),
  error: (message, context) => console.error(`ERROR: ${message}`, context),
  fatal: (message, context) => console.error(`FATAL: ${message}`, context),
}

export default log
