import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
//@angular/material
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticaService } from '../auth/autentica.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveForsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  hide = true;

  formLogin!: FormGroup;
  isLogin: boolean = true;
  isLoading = false;
  error: string = '';
  isError: boolean = false;
  constructor(
    private readonly formBuilder: FormBuilder,
    //private authService: AutenticaService,
    private route: Router,
    private snackBar: MatSnackBar,
    //private auth: AngularFireAuth,

  ) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  login() {
    if (!this.formLogin.valid) {
      return;
    }


    const email = this.formLogin.value.email;
    const senha = this.formLogin.value.senha;

   /* if (this.isLogin) {
      this.authService.loginUser(email, senha).subscribe(
        resposta => {
          this.isLoading = false;
          this.isError = false;
          this.route.navigate(['principal'])
        }, (error) => {
         console.log(error);
        });

    } */
  }

/*  register() {
    this.isLoading = true;
    this.isLogin = false;
    const email = this.formLogin.value.email;
    const senha = this.formLogin.value.senha;

    this.authService.signupUser(email, senha).subscribe(
      responseData => {
        this.snackBar.open('Cadastro realizado com sucesso', 'Fechar', { duration: 6000 });
        this.isLoading = false;
        this.isLogin = true;
        this.isError = false;
        this.route.navigate(['/principal']);
      },
      error => {
        console.log(error);

        this.isError = true;
        this.error = 'Ocorreu um erro ao cadastrar o usuário.'
        this.isLoading = false;
      }
    );
  }

  */
  
  redirectToRegister(): void {
    this.isLogin = !this.isLogin;
  }
}



