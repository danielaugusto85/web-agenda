import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-categoria',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Navbar,
    Sidebar
  ],
  templateUrl: './cadastrar-categoria.html',
  styleUrl: './cadastrar-categoria.css',
})
export class CadastrarCategoria {

  //mensagens da página
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP CLIENT (integração com a API)
  private http = inject(HttpClient);

  //Criando o formulário 
  formulario = new FormGroup({
    nome : new FormControl('', [Validators.required])
  });

  //Criando uma função para fazer o SUBMIT do formulário
  cadastrar() {
    //enviando uma requisição POST para a API da agenda cadastrar a categoria
    this.http.post('http://localhost:8083/api/v1/categorias', this.formulario.value)
      .subscribe({ //aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set("Categoria " + data.nome + ", cadastrada com sucesso.");
          this.mensagemErro.set(""); //limpando mensagem de erro
          this.formulario.reset(); //limpando o formulário
        },
        error: (e) => {
          this.mensagemErro.set(e.error.nome);
          this.mensagemSucesso.set("");
        }
      });
  }
}
