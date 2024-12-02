import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];
  private currentLogLevel: number;
  private logStreams: { [key: string]: fs.WriteStream } = {};
  private maxFileSize: number;

  constructor() {
    const logLevelEnv = process.env.LOG_LEVEL || 'log';
    this.currentLogLevel = this.logLevels.indexOf(logLevelEnv as LogLevel);
    this.maxFileSize = parseInt(process.env.LOG_MAX_SIZE || '1024', 10) * 1024;
    this.initLogStreams();
  }

  private initLogStreams() {
    const logsDir = path.resolve(__dirname, '../../../logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    this.logStreams['common'] = fs.createWriteStream(
      path.join(logsDir, 'app.log'),
      { flags: 'a' },
    );
    this.logStreams['error'] = fs.createWriteStream(
      path.join(logsDir, 'error.log'),
      { flags: 'a' },
    );
    this.setupLogRotation();
  }

  private setupLogRotation() {
    for (const streamKey in this.logStreams) {
      const stream = this.logStreams[streamKey];
      stream.on('open', () => {
        this.rotateLogFileIfNeeded(stream.path as string);
      });
    }
  }

  private rotateLogFileIfNeeded(filePath: string) {
    fs.stat(filePath, (err, stats) => {
      if (err) return;
      if (stats.size >= this.maxFileSize) {
        const newFilePath = `${filePath}.${Date.now()}`;
        fs.rename(filePath, newFilePath, (err) => {
          if (err) console.error('Error rotating log file:', err);
        });
      }
    });
  }

  log(message: any, context?: string) {
    this.writeLog('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.writeLog('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.writeLog('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.writeLog('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.writeLog('verbose', message, context);
  }

  private writeLog(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const levelIndex = this.logLevels.indexOf(level);
    if (levelIndex > this.currentLogLevel) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = `[${level.toUpperCase()}] ${timestamp} [${
      context || ''
    }] ${message} ${trace || ''}\n`;

    if (level === 'error' || level === 'warn') {
      process.stderr.write(logMessage);
    } else {
      process.stdout.write(logMessage);
    }

    this.logStreams['common'].write(logMessage);
    if (level === 'error') {
      this.logStreams['error'].write(logMessage);
    }

    this.rotateLogFileIfNeeded(
      (this.logStreams['common'].path as string) || 'app.log',
    );
    if (level === 'error') {
      this.rotateLogFileIfNeeded(
        (this.logStreams['error'].path as string) || 'error.log',
      );
    }
  }
}
