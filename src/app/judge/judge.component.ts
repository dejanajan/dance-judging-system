import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JudgeApiService } from './judge-api.service';

@Component({
  selector: 'app-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.scss']
})
export class JudgeComponent implements OnInit {
  competitionsList: any[];
  competitionsListUrban: any[];
  adjucator_cat: string;

  constructor(
    private apiService: JudgeApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompetitionListLast();
    this.getCompetitionListUrban();
    this.adjucator_cat = localStorage.getItem('adjucator_category');
  }

  redirect(index){
    localStorage.setItem('index', index);
    if(this.adjucator_cat === '1') {
      this.router.navigate(["/judge/last"]);
    } else {
      this.router.navigate(["/judge/urban"]);
    }    
  }

  getCompetitionListLast(){
    const username = localStorage.getItem('token');
    this.apiService.getCompetitionsList(username).subscribe((list: any[]) => {
      this.competitionsList = list;
    })
  }

  getCompetitionListUrban(){
    const username = localStorage.getItem('token');
    this.apiService.getCompetitionsListUrban(username).subscribe((list: any[]) => {
      this.competitionsListUrban = list;
    })
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(["/"]);
  }




}
