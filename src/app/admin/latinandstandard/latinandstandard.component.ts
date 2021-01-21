import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latinandstandard',
  templateUrl: './latinandstandard.component.html',
  styleUrls: ['./latinandstandard.component.scss']
})
export class LatinandstandardComponent implements OnInit {

  constructor(
    private router: Router,
  ) {
   }

  ngOnInit(): void {
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }
}
