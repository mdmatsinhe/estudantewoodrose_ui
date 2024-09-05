import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, TitleStrategy } from '@angular/router';
import { AutenticacaoService } from 'src/app/core/services/autenticacao.service';
import { UserService } from '../../core/services/user.service';
import { EstudanteService } from '../../core/services/estudante.service';
import { Estudante } from 'src/app/interface/estudante';
import { Utilizador } from '../../interface/utilizador';
import { TokenService } from '../../core/services/token.service';
import { FormValidations } from '../../shared/form-validations';

@Component({
  selector: 'app-atualizar-senha',
  templateUrl: './atualizar-senha.component.html',
  styleUrls: ['./atualizar-senha.component.scss']
})
export class AtualizarSenhaComponent {

  loginForm!: FormGroup;
  userlogado='';

  utilizador!: any;
  estudante!: Estudante;
  user = {} as Utilizador;

  token='';

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
    password:['', Validators.required],
    confirmPassword:['', [Validators.required,FormValidations.equalTo('password')]]
  })

  if(this.tokenService.possuiToken()){
  this.token=this.tokenService.retornarToken();
  this.userService.retornarUser().subscribe(user => this.utilizador = user);
  console.log(this.utilizador.subjectId,this.token)
  this.estudanteService.getByUser(this.utilizador.subjectId,this.token).subscribe( (dados) => {
  this.estudante=dados;
  this.userlogado=this.estudante.nome+' '+this.estudante.apelido+' - '+this.estudante.numero;
 
  this.user.id=this.utilizador.subjectId;
  this.user.loginCount=this.utilizador.loginCount+1;
  
 //
  });
}
}

  reset(){
   this.user.password=this.loginForm.value.confirmPassword;

   console.log(this.user.password,this.loginForm.value.confirmPassword)
   this.authService.atualizarSenha(this.user.id!,this.user.password,this.user.loginCount,this.token).subscribe({
     next: (value)=>{
      this.router.navigateByUrl("/notas");
      console.log('senha atualizada com sucesso');
     },
     error: (err)=>{
       console.log(err);
     }
   });
  
  }

}
