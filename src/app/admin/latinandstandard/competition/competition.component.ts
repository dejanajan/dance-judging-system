import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {
  competitionEventList: any[];
  danceCategoryLaSt: any[];
  danceStyleLaSt: any[];
  ageGroup: any[];
  adjSignId: any[];
  dances: any[];
  heats: any[];
  components: any[];
  adjucators: any[];

  flag_dance_category: number = 1;
  showTable: boolean = false;
  addCompetitionForm: FormGroup;
  date: string;
  dateCreated: string;
  competitions: any[];

  constructor(
    private apiService: ApiService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getCompetitionEvent();
    this.getDanceCategoryLaSt();
    this.getDanceStyleLaSt();
    this.getAgeGroupLaSt();
    this.getAdjSignID();
    this.getDance();
    this.getHeat();
    this.getComponent();
    this.getAdjucators();
    this.validateFormCouples();
    this.date = this.datePipe.transform(new Date().toISOString(), 'yyyy-dd-MM');
    this.dateCreated = this.date.replace(/\-/gi,'/');
  }


  validateFormCouples(){
    this.addCompetitionForm = new FormGroup({
      competitionEvent: new FormControl('1'),
      competitionStyle: new FormControl('1'),
      competitionCategory: new FormControl('1'),
      competitionAgeGroup: new FormControl('1'),
      competitionRound: new FormControl('1'),
      competitionNumCouples: new FormControl(''),
      competitionAdjucatorID: new FormControl('1'),
      competitionComponent: new FormControl('1'),
      competitionAdjucator: new FormControl('3'),
      competitionDate: new FormControl(''),
    })
  }

  onSubmitCompetitionForm(competitionForm){
    this.apiService.postCompetition(competitionForm.competitionDate, competitionForm.competitionEvent, competitionForm.competitionStyle, competitionForm.competitionCategory, competitionForm.competitionAgeGroup, competitionForm.competitionRound, competitionForm.competitionNumCouples)
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log('competition error', error)
    );

    this.apiService.postRound(competitionForm.competitionRound, competitionForm.competitionNumCouples)
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log('round error', error)
    );

    this.apiService.postAdjucatorRound(competitionForm.competitionAdjucatorID, competitionForm.competitionComponent, competitionForm.competitionAdjucator)
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log('adjucator_round error', error)
    );
  }

    /** Get data for dropdown lists */
    getCompetitionEvent(){
      this.apiService.getCometitionEvent().subscribe((events: any[])=>{
        this.competitionEventList = events;
      })
    }
  
    getDanceCategoryLaSt(){
      this.apiService.getDanceCategoryLaSt().subscribe((categories: any[])=>{
        this.danceCategoryLaSt = categories;
      })
    }
  
    getDanceStyleLaSt(){
      this.apiService.getDanceStyleLaSt().subscribe((styles: any[])=>{
        this.danceStyleLaSt = styles;
      })
    }
  
    getAgeGroupLaSt(){
      this.apiService.getAgeGroupLaSt().subscribe((group: any[])=>{
        this.ageGroup = group;
      })
    }
  
    getAdjSignID(){
      this.apiService.getAdjSignID().subscribe((signid: any[])=>{
        this.adjSignId = signid;
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
  
    getComponent(){
      this.apiService.getComponent().subscribe((comp: any[])=>{
        this.components = comp;
      })
    }

    getAdjucators(){
      this.apiService.getAdjucators(this.flag_dance_category).subscribe((adj: any[]) => {
        this.adjucators = adj;
      })
    }

    getCompetitions(form){
      this.apiService.getCompetitions(form.competitionEvent).subscribe((competition: any[])=>{
        this.competitions = competition;
      })
    }

}
