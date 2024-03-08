import { Routes } from '@angular/router';
import { PigFormComponent } from './components/pig-form/pig-form.component';
import { ListarSuinosComponent } from './components/listar-suinos/listar-suinos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { CadastroPesoComponent } from './components/cadastro-peso/cadastro-peso.component';
import { EditarComponent } from './components/editar/editar.component';
import { EditarPesoComponent } from './components/editar-peso/editar-peso.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent},
    { path: 'cadastrarSuino', component: PigFormComponent },
    { path: 'listarSuinos', component: ListarSuinosComponent },
    { path: 'cadastrarPeso', component: CadastroPesoComponent },
    { path: 'editarPeso/:id',  component: EditarPesoComponent},
    { path: 'editarAnimal', component: EditarComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

