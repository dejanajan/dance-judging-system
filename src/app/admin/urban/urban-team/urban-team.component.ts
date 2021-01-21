import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-urban-team',
  templateUrl: './urban-team.component.html',
  styleUrls: ['./urban-team.component.scss']
})
export class UrbanTeamComponent implements OnInit {
  danceCategoryOther: any[];
  danceStyleOther: any[];
  ageGroup: any[];
  addTeamForm: FormGroup;
  teams: any[];
  showTable: boolean = false;

  constructor(
    private apiService: ApiService
  ) { 
    this.validateFormTeam();
  }

  ngOnInit(): void {
    this.getDanceCategoryUrban();
    this.getDanceStyleUrban();
    this.getAgeGroupUrban();
  }

  validateFormTeam(){
    this.addTeamForm = new FormGroup({
      teamName: new FormControl('', Validators.required),
      danceStudio: new FormControl('', Validators.required),
      teamAge: new FormControl('1', Validators.required),
      teamStyle: new FormControl('1', Validators.required),
      teamCategory: new FormControl('1', Validators.required),
      teamId: new FormControl('', Validators.required),
    })
  }

  onSubmitTeamForm(form){
    this.apiService.postTeam(form.teamName, form.danceStudio, form.teamId, form.teamStyle, form.teamCategory, form.teamAge).subscribe(
      (response) => console.log(response),
      (error) => console.log(error),
    )
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

  getTeams(form){
    console.log(form);
    this.apiService.getTeams(form.teamStyle, form.teamCategory, form.teamAge).subscribe((teams: any[])=>{
      this.teams = teams;
    })
  }

}
