import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common';
import { Account, DataService } from './dataservice';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
// Standalone component used for account details page
export class AccountComponent {
  constructor(private data_service: DataService, private route: ActivatedRoute) {}

  title = 'accounts-ui';
  accountLoaded: Account = {};
  errorMessage!: string;
  accountId: string = "";
  
  fieldTextType: boolean = true;
  editMode: boolean = false;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleEditMode(doUpdate: boolean) {
    if (doUpdate) {
      this.data_service.changeName(this.accountId, this.accountLoaded.name as string).subscribe({
        next: (account) => {
          this.accountLoaded.name = account.name;
          console.log(this.accountLoaded);
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
    this.editMode = !this.editMode;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
    });

    this.data_service.getAccount(this.accountId).subscribe({
      next: (account) => {
        this.accountLoaded = account;
        console.log(this.accountLoaded);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
  
}
