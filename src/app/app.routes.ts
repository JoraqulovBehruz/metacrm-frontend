import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrganizationsComponent } from './pages/organizations/organizations.component';
import { StudentsComponent } from './pages/students/students.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'students', component: StudentsComponent },
];