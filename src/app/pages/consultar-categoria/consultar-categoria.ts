import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { Sidebar } from '../../layout/sidebar/sidebar';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-categoria',
  imports: [
    CommonModule,
    Navbar,
    Sidebar,
    RouterLink
  ],
  templateUrl: './consultar-categoria.html',
  styleUrl: './consultar-categoria.css',
})
export class ConsultarCategoria {

  //Atributos
  categorias = signal<any[]>([]);

  //Injeção de dependência  
  private http = inject(HttpClient);

  //Função executada ao abrir a página
  ngOnInit() {
      //Consultar todas as categorias
      this.http.get('http://localhost:8083/api/v1/categorias')
        .subscribe({
          next: (data) => { //resposta de sucesso
            //guardar os dados obtidos para exibir na página
            this.categorias.set(data as any[]);

          },
          error: (e) => { //respsota de erro
            console.log(e.error);
          }
        });
  }

  //Função executada quando o usuário clicar no botão de excluir
  onDelete(categoria: any) {
    //Exibir uma janela popup de confirmação
    if(confirm('Deseja realmente excluir a categoria: ' + categoria.nome + '?')) {
      //Enviando uma requisição do tipo DELETE para a API
      this.http.delete('http://localhost:8083/api/v1/categorias/' + categoria.id)
        .subscribe({
          next: (data: any) => {
            alert('Categoria: ' + data.nome + ", excluída com sucesso!");
            this.ngOnInit(); //fzer a consulta novamente
          },
          error: (e) => {
            alert(e.error);
          }
        });
    }



  }
}
