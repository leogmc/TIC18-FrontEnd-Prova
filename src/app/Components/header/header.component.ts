import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public estaAutenticado = true;
  currentRoute: string = '';

  constructor(private router:Router) {
    
  }
  logout() {
    
    console.log('logout');

  }

  navigateTo(arg0: string) {
    this.currentRoute = arg0;
    this.router.navigate([arg0]);
  }

  // Para Angular
isMenuExpanded: boolean = false;

toggleMenu(): void {
  this.isMenuExpanded = !this.isMenuExpanded;
}
// Método para verificar se está na página 'Suinos'
isOnSuinosPage(): boolean {
  return this.currentRoute === 'suinos';
}

// Método para verificar se está na página 'Home'
isOnHomePage(): boolean {
  return this.currentRoute === 'home';
}
}
