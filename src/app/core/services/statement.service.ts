import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Statement {
  phone: string;
  name: string;
  complex: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatementService {
  constructor(private http: HttpClient) {}

  public createStatement(statement: Statement) {
    return this.http.post('/test/statement', statement);
  }
}
