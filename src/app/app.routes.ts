import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { SuinosComponent } from './Pages/suinos/suinos.component';
import { EditarComponent } from './Pages/suinos/peso/editar/editar.component';
import { DetailsComponent } from './Pages/suinos/details/details.component';



export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full',
    },
    {
        path: 'login', component:LoginComponent,
        
    },
    
    {
        path: 'home', component:HomeComponent,
        pathMatch: 'full',
    },
    {
        path:'suinos', component:SuinosComponent,
    },
    {
        path:'suino/details/:id', component:DetailsComponent
    }
];

