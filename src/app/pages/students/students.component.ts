import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

interface Student {
  id: number;
  fullName: string;
  phone: string;
  parentPhone: string;
  address: string;
  birthDate: string;
  organizationId: number;
  groupId: number | null;
  isActive: boolean;
}

interface Organization {
  id: number;
  name: string;
}

interface Group {
  id: number;
  name: string;
  subject: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  organizations: Organization[] = [];
  groups: Group[] = [];
  loading = false;
  showModal = false;
  isEditing = false;
  searchText = '';

  form = {
    id: 0,
    fullName: '',
    phone: '',
    parentPhone: '',
    address: '',
    birthDate: '',
    organizationId: 0,
    groupId: null as number | null
  };

  private apiUrl = 'https://metacrm-backend-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadOrganizations();
    this.loadGroups();
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadStudents(): void {
    this.loading = true;
    this.http.get<Student[]>(`${this.apiUrl}/students`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => { this.students = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  loadOrganizations(): void {
    this.http.get<Organization[]>(`${this.apiUrl}/organizations`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => this.organizations = data });
  }

  loadGroups(): void {
    this.http.get<Group[]>(`${this.apiUrl}/groups`, { headers: this.getHeaders() })
      .subscribe({ next: (data) => this.groups = data });
  }

  get filteredStudents() {
    return this.students.filter(s =>
      s.fullName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      s.phone.includes(this.searchText)
    );
  }

  openModal(student?: Student): void {
    if (student) {
      this.isEditing = true;
      this.form = {
        id: student.id,
        fullName: student.fullName,
        phone: student.phone,
        parentPhone: student.parentPhone,
        address: student.address,
        birthDate: student.birthDate?.split('T')[0] || '',
        organizationId: student.organizationId,
        groupId: student.groupId
      };
    } else {
      this.isEditing = false;
      this.form = { id: 0, fullName: '', phone: '', parentPhone: '', address: '', birthDate: '', organizationId: 0, groupId: null };
    }
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; }

  save(): void {
    if (this.isEditing) {
      this.http.put(`${this.apiUrl}/students/${this.form.id}`, this.form, { headers: this.getHeaders() })
        .subscribe({ next: () => { this.loadStudents(); this.closeModal(); } });
    } else {
      this.http.post(`${this.apiUrl}/students`, this.form, { headers: this.getHeaders() })
        .subscribe({ next: () => { this.loadStudents(); this.closeModal(); } });
    }
  }

  getOrgName(id: number): string {
    return this.organizations.find(o => o.id === id)?.name || '';
  }

  getGroupName(id: number | null): string {
    if (!id) return 'Guruhsiz';
    return this.groups.find(g => g.id === id)?.name || '';
  }
}
