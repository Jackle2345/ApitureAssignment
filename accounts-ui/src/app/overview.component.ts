import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'

import { CommonModule } from '@angular/common';
import { Account, DataService } from './dataservice';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule, 
    MatButtonModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
// Standalone component used for overview page
export class OverviewComponent {
  constructor(private data_service: DataService) {}

  title = 'accounts-ui';
  errorMessage!: string;
  accountArray: Account[] = [];

  ngOnInit() {
    this.data_service.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accountArray = accounts;
        console.log(this.accountArray);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
  
}
