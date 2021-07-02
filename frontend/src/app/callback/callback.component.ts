import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";

import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  token: any = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token'))
    {
        this.router.navigate(['index'])
        return ;
    }    
    let uri: string = window.location.href;
    uri = uri.replace('4200', '3000');
    console.log(uri);
    this.apiService.getToken(uri).subscribe((result)=>{
        this.token = result;
        console.log('token ' + this.token.login);
        sessionStorage.setItem('token', this.token.login);
        this.router.navigate(['index']);
    })
  }

  getToken(uri: string): void {
    this.apiService.getToken(uri).subscribe(token => this.token = token);
  }

}
