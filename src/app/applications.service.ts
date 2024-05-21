import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private app:HttpClient) { }

  getApplications () {
    return this.app.get('./assets/info.json');
  }
}
