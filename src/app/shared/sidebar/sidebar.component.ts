import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false;

  menuItems = [
    { label: 'Bosh sahifa', icon: '🏠', route: '/dashboard' },
    { label: 'Tashkilotlar', icon: '🏢', route: '/organizations' },
    { label: 'Talabalar', icon: '👥', route: '/students' },
    { label: 'Guruhlar', icon: '📚', route: '/groups' },
    { label: 'Davomat', icon: '📅', route: '/attendance' },
    { label: 'To\'lovlar', icon: '💳', route: '/payments' },
    { label: 'Foydalanuvchilar', icon: '👤', route: '/users' },
    { label: 'Hisobotlar', icon: '📊', route: '/reports' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
