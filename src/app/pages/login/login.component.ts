import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { AutenticacaoService } from '../../core/services/autenticacao.service';
import { MessageService } from 'primeng/api';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  durationInSeconds = 5;
  token = '';
  userlogado: any;
  loginCount!: number;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AutenticacaoService,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  candidatura(){
    this.router.navigate(['steps']);
  }

  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.autenticar(username, password).subscribe({
      next: (value) => {
       
        if (this.tokenService.possuiToken()) {
          this.token = this.tokenService.retornarToken();
          this.userService.retornarUser().subscribe(user => {
            this.userlogado = user
            this.loginCount = this.userlogado.loginCount;

          });

          if (this.loginCount == 0) {
            this.router.navigateByUrl("/auth/reset");
          } else {
            // Exibir Toast informativo após o login
            this.messageService.add({
              severity: 'info',
              summary: 'Informação Importante',
              detail: `Caro estudante, já pode efectuar pagamentos usando entidade e referência.
                  Aceda ao menu /Plano de Pagamento`,
              sticky: true // Mantém a mensagem até o usuário fechar
            });
            // Redireciona após o Toast
            setTimeout(() => {
              this.router.navigateByUrl('/disciplinas');
            }, 6000); // Redireciona após 10 segundos
          }

        }


        this.loginForm.reset();
      }
    });
  }

}
