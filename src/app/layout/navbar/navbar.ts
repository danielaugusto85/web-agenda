import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

    //Atributos
    nome = signal<string>('');
    perfil = signal<string>('');
  
    //evento do angular que é executado
    //sempre que a página é aberta
    ngOnInit() {
      //ler os dados do usuário salvo na sessão
      const json = sessionStorage.getItem("usuario");
      //converter os dados em formato JSON
      const usuario = JSON.parse(json as string);
      //capturar o nome e o perfil
      this.nome.set(usuario.nome);
      this.perfil.set(usuario.perfil);
    }
  
  
    //função para logout do usuário
    logout() {
      if(confirm('Deseja realmente sair do sistema?')) {
        //apagar os dados da session storage
        sessionStorage.removeItem('usuario');
        //redirecionar de volta para a página de login
        location.href = '/';
      }
    }
}
