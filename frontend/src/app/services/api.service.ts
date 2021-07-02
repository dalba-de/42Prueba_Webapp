import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from "../interfaces/test";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  API_SERVER = "http://localhost:3000/api";

  getTestService(): Observable<Test> {
      return this.http.get<Test>(`${this.API_SERVER}`);
  }

  public getToken(uri: string) {
    return this.http.get(uri);
    }
}