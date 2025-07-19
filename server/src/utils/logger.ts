import { ENV_CONFIG } from '@/config/envConfig'
import winston from 'winston'
import 'winston-daily-rotate-file'
import path from 'path'
import chalk from 'chalk'

const logDir = path.resolve('logs')

const transportAll = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '5m',
  maxFiles: '14d',
  level: 'info',
})

const transportError = new winston.transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '5m',
  maxFiles: '30d',
  level: 'error',
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [transportAll, transportError],
})

if (ENV_CONFIG.isDevelopment) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  )
}

export const LOGGER_CONSOLE = {
  info: (msg: string) => {
    console.log(chalk.cyanBright(`[INFO] ${msg}`))
  },
  success: (msg: string) => {
    console.log(chalk.greenBright(`[SUCCESS] ${msg}`))
  },
  warn: (msg: string) => {
    console.log(chalk.yellowBright(`[WARN] ${msg}`))
  },
  error: (msg: string, err?: any) => {
    console.error(chalk.redBright(`[ERROR] ${msg}`), err || '')
  },

  logStartupInfo: () => {
    console.log(chalk.magentaBright.bold('\n🚀 FASTIFY SERVER STARTED\n'))

    console.table({
      'App Name': 'JWT-AUTHENTICATION-REACT-FASTIFY',
      Environment: process.env.NODE_ENV || 'development',
      Host: ENV_CONFIG.host,
      Port: ENV_CONFIG.port,
      'API Prefix': '/api/v1',
      'JWT Secret':
        ENV_CONFIG.REFRESH_TOKEN_SECRET_SIGNATURE &&
        ENV_CONFIG.ACCESS_TOKEN_SECRET_SIGNATURE
          ? '✔️ Loaded'
          : '❌ Not Set',
      'Started At': new Date().toLocaleString(),
    })

    console.log(
      chalk.greenBright(
        `\n🌐 Ready at: http://${ENV_CONFIG.host}:${ENV_CONFIG.port}`
      )
    )
    console.log(
      chalk.blueBright(
        `📦 API entry: http://${ENV_CONFIG.host}:${ENV_CONFIG.port}/api/v1`
      )
    )
    console.log(
      chalk.gray(
        `🧪 Health check: http://${ENV_CONFIG.host}:${ENV_CONFIG.port}/`
      )
    )
    console.log('')
  },
}
