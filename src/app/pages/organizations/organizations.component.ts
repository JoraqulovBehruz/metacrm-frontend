import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

interface Organization {
  id: number;
  name: string;
  phone: string;
  address: string;
  email: string;
  type: number;
  isActive: boolean;
}

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  organizations: Organization[] = [];
  loading = false;
  showModal = false;
  isEditing = false;

  form = {
    id: 0,
    name: '',
    phone: '',
    address: '',
    email: '',
    type: 0
  };

  orgTypes = [
    { value: 0, label: 'O\'quv markaz' },
    { value: 1, label: 'Maktab' },
    { value: 2, label: 'Bog\'cha' }
  ];

  private apiUrl = 'https://metacrm-backend-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrganizations();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadOrganizations(): void {
    this.loading = true;
    this.http.get<Organization[]>(`${this.apiUrl}/organizations`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => { this.organizations = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  openModal(org?: Organization): void {
    if (org) {
      this.isEditing = true;
      this.form = { ...org };
    } else {
      this.isEditing = false;
      this.form = { id: 0, name: '', phone: '', address: '', email: '', type: 0 };
    }
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  save(): void {
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/organizations/${this.form.id}`, this.form, { headers: this.getHeaders() })
        .subscribe({ next: () => { this.loadOrganizations(); this.closeModal(); } });
    } else {
      this.http.post(`${this.apiUrl}/organizations`, this.form, { headers: this.getHeaders() })
        .subscribe({ next: () => { this.loadOrganizations(); this.closeModal(); } });
    }
  }

  getTypeName(type: number): string {
    return this.orgTypes.find(t => t.value === type)?.label || '';
  }
}
