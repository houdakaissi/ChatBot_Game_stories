import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface QueryRequest {
  query: string;
  context?: string;
}

interface QueryResponse {
  response: string;
}

 

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private apiUrl = 'http://localhost:8000/answer/';  // Update with your FastAPI endpoint

  constructor(private http: HttpClient) { }

  getAnswer(queryRequest: QueryRequest): Observable<QueryResponse> {
    return this.http.post<QueryResponse>(this.apiUrl, queryRequest);
  }
}

