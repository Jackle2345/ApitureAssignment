import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Account, DataService } from './dataservice';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    RouterLink,
    RouterLinkActive,
    CommonModule, 
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
// Main component for navigation bar and routing
export class AppComponent {
  constructor(private data_service: DataService) {}
  accountArray: Account[] = [];
  errorMessage!: string;

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
