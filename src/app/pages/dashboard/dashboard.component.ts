import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  stats = [
    { label: 'Talabalar', value: 0, icon: '👥', color: '#185FA5' },
    { label: 'Guruhlar', value: 0, icon: '📚', color: '#0F6E56' },
    { label: 'Bugungi davomat', value: 0, icon: '📅', color: '#BA7517' },
    { label: "To'lovlar", value: 0, icon: '💳', color: '#993556' },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}