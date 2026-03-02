import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-usuario.html',
  styleUrl: './cadastrar-usuario.css',
})
export class CadastrarUsuario {

  //inicializar um atributo do tipo HTTPCLIENT (injeção de dependência)
  private http = inject(HttpClient);

  //variáveis para gerar as mensagens do usuário
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');



  //criando um formulário
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    senha : new FormControl('', [Validators.required])
  });

  //função para cadastrar o usuário
  cadastrar() {
    //console.log(this.formulario.value);

    //Limpar as mensagens anteriores
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    //Enviar uma chamada para a API de cadastro de usuário
    this.http.post('http://localhost:8082/api/v1/usuario/criar', this.formulario.value)
      .subscribe({ //aguardando o retorno da API
        next : (data: any) => { //retorno de sucesso da API
          //console.log(data);
          this.mensagemSucesso.set('Parabéns, ' + data.nome + '! Seu cadastro foi realizado com sucesso.');
          this.formulario.reset();  //limpar o formulário após o cadastro
        },
        error : (e) => {  //retorno de erro da API
          //console.log(e.error);
          this.mensagemErro.set(e.error);
        }
      });
  }
}
