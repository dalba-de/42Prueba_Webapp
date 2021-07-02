import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from "./interfaces/test";
import { ApiService } from "./services/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  testValue: Observable<Test> = this.service.getTestService();

  constructor (private service: ApiService) {}
}
