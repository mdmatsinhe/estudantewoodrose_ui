import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error + "o erro encontrado")
        if (error.status === 401) {
          this.messageService.add({
            severity: 'error',
            summary: 'Autenticação',
            detail: 'Credenciais inválidas. Por favor, tente novamente.',
          });
        } else if (error.status === 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Autenticação',
            detail: 'Os serviços do sistema estão offline. Entre em contato com o administrador.',
          });
        }
        return throwError(error);
      })
    );
  }
}
