import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-urban-competition',
  templateUrl: './urban-competition.component.html',
  styleUrls: ['./urban-competition.component.scss']
})
export class UrbanCompetitionComponent implements OnInit {
  ageGroup: any[];
  competitionEventList: any[];
  adjSignId: any[];
  danceCategoryOther: any[];
  danceStyleOther: any[];
  heats: any[];
  adjucators: any[];

  flag_dance_category: number = 3;
  addCompetitionForm: FormGroup;
  competitions: any[];
  showTable: boolean = false;

  constructor(
    private apiService: ApiService
  ) {
    this.validateFormTeam();
   }

  ngOnInit(): void {
    this.getAgeGroupUrban();
    this.getCompetitionEvent();
    this.getAdjSignID();
    this.getDanceCategoryUrban();
    this.getDanceStyleUrban();
    this.getHeat();
    this.getAdjucators();
  }

  validateFormTeam(){
    this.addCompetitionForm = new FormGroup({
      competitionDate: new FormControl('', Validators.required),
      danceEvent: new FormControl('1', Validators.required),
      competitionCategory: new FormControl('1', Validators.required),
      competitionStyle: new FormControl('1', Validators.required),
      danceAgeGroup: new FormControl('1', Validators.required),
      noCompRound: new FormControl('1', Validators.required),
      noTeams: new FormControl('', Validators.required),
      adjucatorId: new FormControl('1', Validators.required),
      adjucator: new FormControl('5', Validators.required),

    })
  }

  onSubmitCompetitionForm(form){
    this.apiService.postCompetitionTeam(form.competitionDate, form.danceEvent, form.competitionStyle, form.competitionCategory, form.danceAgeGroup, form.noCompRound, form.noTeams) .subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    );

    this.apiService.postRoundTeam(form.noCompRound, form.noTeams)
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log('round error', error)
    );

    this.apiService.postAdjucatorRoundTeam(form.adjucatorId, form.adjucator)
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log('adjucator_round error', error)
    );
  }

  getCompetitionEvent(){
    this.apiService.getCometitionEvent().subscribe((events: any[])=>{
      this.competitionEventList = events;
    })
  }

  getAgeGroupUrban(){
    this.apiService.getAgeGroupUrban().subscribe((group: any[])=>{
      this.ageGroup = group;
    })
  }

  getAdjSignID(){
    this.apiService.getAdjSignID().subscribe((signid: any[])=>{
      this.adjSignId = signid;
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

  getAdjucators(){
    this.apiService.getAdjucators(this.flag_dance_category).subscribe((adj: any[]) => {
      this.adjucators = adj;
    })
  }

  
  getCompetitions(form){
    this.apiService.getCompetitionsUrban(Number(form.danceEvent)).subscribe((competition: any[])=>{
      this.competitions = competition;
    })
  }
}
