import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-urban-ranking',
  templateUrl: './urban-ranking.component.html',
  styleUrls: ['./urban-ranking.component.scss']
})
export class UrbanRankingComponent implements OnInit {
  rankingUrbanForm: FormGroup;
  danceCategoryOther: any[];
  ageGroup: any[];
  danceStyleOther: any[];
  heats: any[];
  teams: any[];
  showTable: boolean=false;

  constructor(
    private apiService: ApiService
  ) { 
    this.validateForm();
  }

  ngOnInit(): void {
    this.getAgeGroupUrban();
    this.getDanceCategoryUrban();
    this.getDanceStyleUrban();
    this.getHeat();
  }

  validateForm(){
    this.rankingUrbanForm = new FormGroup({
      danceStyle: new FormControl('1'),
      ageGroup: new FormControl('1'),
      danceCategory: new FormControl('1'),
      round: new FormControl('1'),
    })
  }

  onSubmitRankingUrbanForm(form) {
    this.apiService.getScoreUrban(form.round, form.danceStyle, form.danceCategory, form.ageGroup).subscribe(team => {
      this.teams = team;
    })
  }

  getAgeGroupUrban(){
    this.apiService.getAgeGroupUrban().subscribe((group: any[])=>{
    this.ageGroup = group;
    })
  }

  getDanceCategoryUrban(){
    this.apiService.getDanceCategoryUrban().subscribe((categories: any[])=>{
      this.danceCategoryOther = categories;
    })
  }

  getDanceStyleUrban(){
    this.apiService.getDanceStyleUrban().subscribe((styles: any[])=>{
      this.danceStyleOther = styles;
    })
  }

  getHeat(){
    this.apiService.getHeat().subscribe((heat: any[])=>{
      this.heats = heat;
    })
  }
}
