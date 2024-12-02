import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';
  import { LoggingService } from './logging.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggingService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
  
      const { method, url, query, body } = request;
      const userAgent = request.headers['user-agent'] || '';
      const ip = request.ip;
  
      this.logger.log(
        `Incoming Request: ${method} ${url} - Query: ${JSON.stringify(
          query,
        )} - Body: ${JSON.stringify(body)} - UserAgent: ${userAgent} - IP: ${ip}`,
        context.getClass().name,
      );
  
      const now = Date.now();
  
      return next.handle().pipe(
        tap((data) => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
  
          this.logger.log(
            `Outgoing Response: ${method} ${url} - Status: ${statusCode} - Duration: ${
              Date.now() - now
            }ms`,
            context.getClass().name,
          );
        }),
      );
    }
  }
  