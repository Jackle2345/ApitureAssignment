import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Account {
    _id?: string;
    name?: string | undefined;
    accountType?: string;
      ifxType?: "DDA" | "SDA";
      accountNumbers?: {
        masked?: string
        full?: string
      };
      balance?: {
        available?: string
        currency?: string
      };
      openedAt?: string;
      routingNumber?: string;
  };

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) {}

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  getAccount(id: string):Observable<Account> {
    return this.http.get<Account>(this.apiUrl + '/' + id + '?unmasked');
  }

  changeName(id: string, newName: string):Observable<Account> {
    const options = {
        headers: new HttpHeaders({ "Content-Type": "application/json"})
    };
    return this.http.patch<Account>(
        this.apiUrl + '/' + id, 
        { name : newName },
        options
    );
  }
}
