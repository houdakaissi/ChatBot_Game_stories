import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getAnswer(query: string, context?: string) {
    const url = 'http://localhost:8000/answer/';
    const body = { query, context };
    return this.http.post(url, body);
  }
}
