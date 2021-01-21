import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-urban-results',
  templateUrl: './urban-results.component.html',
  styleUrls: ['./urban-results.component.scss']
})
export class UrbanResultsComponent implements OnInit {
  danceCategoryOther: any[];
  ageGroup: any[];
  danceStyleOther: any[];
  heats: any[];
  resultsUrbanForm: FormGroup;
  result: any[];
  ranking: any [];
  showTable: boolean = false;
  error: boolean = false;

  constructor(
    private apiService: ApiService
  ) { 
    this.validateFormResults();
  }

  ngOnInit(): void {
    this.getAgeGroupUrban();
    this.getDanceCategoryUrban();
    this.getDanceStyleUrban();
    this.getHeat();
  }

  validateFormResults(){
    this.resultsUrbanForm = new FormGroup({
      danceStyle: new FormControl('1'),
      ageGroup: new FormControl('1'),
      danceCategory: new FormControl('1'),
      danceRound: new FormControl('1'),
    })
  }

  onSubmitResultsUrbanForm(form){
    this.apiService.getResult(form.danceRound, form.danceStyle, form.danceCategory, form.ageGroup).subscribe(
      (result) => {
        this.result = result;
      },
      (error) => console.log(error)
    )
  }

  calculateRanking(form){
    this.apiService.getResult(form.danceRound, form.danceStyle, form.danceCategory, form.ageGroup).subscribe(
      (ranking) => {
        this.ranking = ranking;
        let uniqueIds = [... new Set(ranking.map(item => item.team_id))];
        this.scorePerTeam(uniqueIds, form.danceRound, form.danceStyle, form.danceCategory, form.ageGroup);
        
      },
      (error) => console.log(error)
    )
  }

  scorePerTeam(uniqueTeamIds, round, danceStyle, danceCategory, ageGroup){
    let arrMarks = [];
    uniqueTeamIds.forEach(team => {
      this.apiService.getCalculationsResult(round, danceStyle, danceCategory, ageGroup, team).subscribe(item => {
        arrMarks = [];
        item.forEach(key => {
          arrMarks.push(Number(key.mark));
        });
        let endMark = this.sumMarks(arrMarks);
        this.apiService.postScoreUrban(team, round, danceStyle, danceCategory, ageGroup, endMark).subscribe(
          (response) => {console.log(response)},
          (error) => {if(error.status == 501){
            this.error = true;
          }}
        )
      });
    });
  }

  sumMarks(marks){
    return marks.reduce((a, b) => a + b, 0);
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
