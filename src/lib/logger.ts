const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
} as const

type LogLevel = keyof typeof LOG_LEVELS

class Logger {
  private level: LogLevel = 'INFO'

  constructor() {
    if (typeof window !== 'undefined') {
      this.level = process.env.NODE_ENV === 'development' ? 'DEBUG' : 'ERROR'
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.level]
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog('DEBUG')) {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog('INFO')) {
      console.info(`[INFO] ${message}`, ...args)
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog('WARN')) {
      console.warn(`[WARN] ${message}`, ...args)
    }
  }

  error(message: string, error?: Error | unknown, ...args: any[]) {
    if (this.shouldLog('ERROR')) {
      console.error(`[ERROR] ${message}`, error, ...args)

      // 本番環境ではエラートラッキングサービスに送信
      if (process.env.NODE_ENV === 'production') {
        this.sendToErrorTracking(message, error)
      }
    }
  }

  private sendToErrorTracking(message: string, error?: Error | unknown) {
    // TODO: Sentry, Rollbar, などのエラートラッキングサービスと統合
    // 現時点ではコンソールログのみ
  }
}

export const logger = new Logger()
