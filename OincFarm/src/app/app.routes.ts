import { Routes } from '@angular/router';
import { PigFormComponent } from './components/pig-form/pig-form.component';
import { ListarSuinosComponent } from './components/listar-suinos/listar-suinos.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: 'cadastrarSuino', component: PigFormComponent },
    { path: 'listarSuinos', component: ListarSuinosComponent },
    { path: 'home', component: HomeComponent},
    // { path: 'editarAtendimento/:id', component: EditarAtendimentoComponent},
    // { path: 'detalharAtendimento/:id', component: DetalharAtendimentoComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
