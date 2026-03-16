import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  imports: [
    Navbar,
    Sidebar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  templateUrl: './editar-categoria.html',
  styleUrl: './editar-categoria.css',
})
export class EditarCategoria {

  //mensagens
  mensagemSucesso = signal<string>('');
  mensagemErro = signal<string>('');

  //HTTP CLIENT
  private http = inject(HttpClient);

  //ACTIVATED ROUTE (capturar variaveis passadas na URL da rota)
  private ActivatedRoute = inject(ActivatedRoute);

  //Armazenar o id do cliente na URL
  private id: string = '';

  //Função executada ao abrir a página
  ngOnInit() {
    //cpturar o id enviado na URL
    this.id = this.ActivatedRoute.snapshot.paramMap.get('id') as string;
    //consultar os dados da categoria na API através do ID
    this.http.get('http://localhost:8083/api/v1/categorias/' + this.id)
      .subscribe((data: any) => {
        //Preencher o formulário com os dados da categoria
        this.formulario.patchValue(data);
      });
  }

  //Criando o formulário 
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required])
  });

  //Criando uma função para fazer o SUBMIT do formulário
  atualizar() {
    //enviando uma requisição PUT para a API da agenda cadastrar a categoria
    this.http.put('http://localhost:8083/api/v1/categorias/' + this.id, this.formulario.value)
      .subscribe({ //aguardando o retorno da API
        next: (data: any) => {
          this.mensagemSucesso.set("Categoria " + data.nome + ", atualizada com sucesso.");
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
