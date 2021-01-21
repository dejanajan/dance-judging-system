import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showAppLog: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showLogin(){
    this.showAppLog = !this.showAppLog;
  }

}
