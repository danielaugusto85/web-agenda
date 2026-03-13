import { Routes } from '@angular/router';
import { AutenticarUsuario } from './pages/autenticar-usuario/autenticar-usuario';
import { CadastrarUsuario } from './pages/cadastrar-usuario/cadastrar-usuario';
import { Dashboard } from './pages/dashboard/dashboard';
import { AuthGuard } from './guards/auth.guard';
import { CadastrarCategoria } from './pages/cadastrar-categoria/cadastrar-categoria';
import { ConsultarCategoria } from './pages/consultar-categoria/consultar-categoria';
import { EditarCategoria } from './pages/editar-categoria/editar-categoria';

export const routes: Routes = [
    {
        path : "pages/autenticar-usuario", //rota de navegação
        component: AutenticarUsuario //classe do componente
    },
    {
        path : "pages/dashboard", //rota de navegação
        component : Dashboard, //Classe do componente
        canActivate: [AuthGuard] //aplicando o guardião
    },
    {
        path : "pages/cadastrar-usuario", //rota de navegação
        component: CadastrarUsuario, //classe do componente
    },
    {
        path : "pages/cadastrar-categoria", //rota de navegação
        component: CadastrarCategoria, //classe do componente
        canActivate: [AuthGuard] //aplicando o guardião
    },
    {
        path : "pages/consultar-categoria", //rota de navegação
        component: ConsultarCategoria, //classe do componente
        canActivate: [AuthGuard] //aplicando o guardião
    },
    {
        path : "pages/editar-categoria", //rota de navegação
        component: EditarCategoria, //classe do componente
        canActivate: [AuthGuard] //aplicando o guardião
    },
    {
        path : "", //rota de navegação para a página inicial
        redirectTo: "/pages/autenticar-usuario", //redirecionamento
        pathMatch : "full" //correspondência completa da rota
    }

];
