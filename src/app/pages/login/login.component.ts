import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EstudanteService } from 'src/app/core/services/estudante.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { AutenticacaoService } from '../../core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  durationInSeconds = 5;
  token='';
  userlogado:any;
  loginCount!:number;
  
    constructor(
      private formBuilder: FormBuilder,
      private authService: AutenticacaoService,
      private router: Router,
      private _snackBar: MatSnackBar,
      private userService: UserService,
      private estudanteService: EstudanteService,
      private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login(){
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.autenticar(username,password).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso', value)
        
        //verifica se possui token e le o login count

        if(this.tokenService.possuiToken()){
          this.token=this.tokenService.retornarToken();
        this.userService.retornarUser().subscribe(user => 
          {
            this.userlogado = user
            this.loginCount=this.userlogado.loginCount;
           
          });

          if(this.loginCount==0){
            this.router.navigateByUrl("/auth/reset");
          }else{
            this.router.navigateByUrl("/notas");
          }
       
      }

       
       this.loginForm.reset();
      },
      error: (err) => {
        console.log('Erro no login',err);
        this._snackBar.open('Credenciais Inválidas','Erro de Autenticação', {
          duration: this.durationInSeconds * 1000,
        });
      }
    })
  }

}
