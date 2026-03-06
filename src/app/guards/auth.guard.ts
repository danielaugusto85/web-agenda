import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    //Criando um objeto da classe 'Router'
    private router = inject(Router);

    //Função para verificar se o usuário está autenticado
    //Antes de acessar uma determinada página
    canActivate(): boolean {

        //Verificar se o usuário está autenticado
        if(sessionStorage.getItem('usuario')) {
            return true; //Usuário pode acessar a página!
        }
        else{
            this.router.navigate(['/pages/autenticar-usuario']);
            return false;
        }
    }
}