import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  rankingForm: FormGroup;
  danceStyleLaSt: any[];
  ageGroup: any[];
  dances: any[];
  heats: any[];
  danceCategoryLaSt: any[];
  showTable: boolean=false;
  endScore: any[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getDanceStyleLaSt();
    this.getAgeGroupLaSt();
    this.getDanceCategoryLaSt();
    this.getDance();
    this.getHeat();
    this.validateForm();
  }

  validateForm(){
    this.rankingForm = new FormGroup({
      danceStyle: new FormControl('1'),
      ageGroup: new FormControl('1'),
      danceCategory: new FormControl('1'),
      round: new FormControl('1'),
    })
  }

  onSubmitRankingForm(rankingForm){
    this.apiService.getScore(rankingForm.round, rankingForm.danceStyle, rankingForm.danceCategory, rankingForm.ageGroup).subscribe(score => {
    this.endScore = score;
    })
  }

  getDanceStyleLaSt(){
    this.apiService.getDanceStyleLaSt().subscribe((styles: any[])=>{
      this.danceStyleLaSt = styles;
    })
  }

  getDanceCategoryLaSt(){
    this.apiService.getDanceCategoryLaSt().subscribe((categories: any[])=>{
      this.danceCategoryLaSt = categories;
    })
  }

  getAgeGroupLaSt(){
    this.apiService.getAgeGroupLaSt().subscribe((group: any[])=>{
      this.ageGroup = group;
    })
  }

  getDance(){
    this.apiService.getDanceLast().subscribe((dance: any[])=>{
      this.dances = dance;
    })
  }

  getHeat(){
    this.apiService.getHeat().subscribe((heat: any[])=>{
      this.heats = heat;
    })
  }

}
