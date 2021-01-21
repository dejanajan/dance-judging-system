import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JudgeApiService } from '../judge-api.service';

@Component({
  selector: 'app-urban-competition',
  templateUrl: './urban-competition.component.html',
  styleUrls: ['./urban-competition.component.scss']
})
export class UrbanCompetitionComponent implements OnInit {

  @ViewChild('successModal') successModal;
  addTeamMarksForm: FormGroup;
  competition: any[];
  arrChoosenComp: any[] = [];
  teams: any;
  leftTeamCrash: number = 0;
  rightTeamCrash: number = 0;
  blueSide: number[] = [];
  redSide: number[] = [];
  arrTeams: any[] = [];
  adjucatorId: any[] = [];
  leftCrash: any[] = [];
  rightCrash: any[] = [];


  constructor(
    private apiService: JudgeApiService,
    private route: Router,
  ) {
    this.validateTeamMarksForm();
   }

  ngOnInit(): void {
    this.getUrbanTeams();
  }

  validateTeamMarksForm(){
    this.addTeamMarksForm = new FormGroup({
      technique: new FormControl('0', Validators.required),
      variety: new FormControl('0', Validators.required),
      performativity: new FormControl('0', Validators.required),
      musicality: new FormControl('0', Validators.required),
      creativity: new FormControl('0', Validators.required),
      personality: new FormControl('0', Validators.required)
    });
  }

  onSubmitTeamMarksForm(form){
    const points = form.value;
 
    for(let mark of Object.values(points)) {
      if (mark > 0 ){
        this.redSide.push(Number(mark));
      } else {
        this.blueSide.push(Number(mark));
      }
    }

    this.arrChoosenComp.forEach(item => {
      const heat_id = item.heat_id;

      let blueTeamSum = this.blueSide.reduce((a, b) => a + b, 0);
      let redTeamSum = this.redSide.reduce((a, b) => a + b, 0);

      if (this.leftCrash.length && Math.abs(Number(blueTeamSum.toFixed(2))) >= 12.5) {
        blueTeamSum = Math.abs(Number(blueTeamSum.toFixed(2))) - (this.leftCrash.length * 2.5);
      }

      if (this.rightCrash.length && Math.abs(Number(redTeamSum.toFixed(2))) >= 12.5) {
        redTeamSum = Math.abs(Number(redTeamSum.toFixed(2))) - (this.rightCrash.length * 2.5);
      }
 
      this.arrTeams.forEach((team, index) => {
        switch(index){
          case 0:
            return this.apiService.postMarkUrban(team.team_id, heat_id, team.adj_id, Math.abs(Number(blueTeamSum.toFixed(2)))).subscribe(
              (response) => {
                console.log(response)
              },
              (error) => console.log(error)
            )                
          case 1: 
            return this.apiService.postMarkUrban(team.team_id, heat_id, team.adj_id, Math.abs(Number(redTeamSum.toFixed(2)))).subscribe(
              (response) => {
                console.log(response)
              },
              (error) => console.log(error),
              () => {this.successModal.nativeElement.className = 'modal fade show'; }
            )
        };
      });
    });

  }

  getUrbanTeams() {
    const username = localStorage.getItem('token');
    const index = localStorage.getItem('index');

    this.arrChoosenComp = [];

    this.apiService.getCompetitionsListUrban(username).subscribe((details: any[]) => {
      this.competition = details;

      this.arrChoosenComp.push(details[index]);

      this.apiService.getCompetitionTeams(username, details[index].urban_dance_style_id, details[index].urban_dc_id, details[index].urban_age_group_id).subscribe((team: any) => {
        this.teams = team;

        for(let team of this.teams){
          this.arrTeams.push(team);
        }
      });
    });
  };

  crashLeft(event: any){
    this.leftTeamCrash++;
    let crash = this.leftTeamCrash;
    if (crash === 5){
      event.target.disabled = true;
      event.target.style.cursor = "not-allowed";
    } 

    if (crash <= 5){
      this.leftCrash.push(crash);
    }
  }

  crashRight(event: any){
    this.rightTeamCrash++;
    let crash = this.rightTeamCrash;
    if (crash === 5){
      event.target.disabled = true;
      event.target.style.cursor = "not-allowed";
    } 

    if (crash <= 5){
      this.rightCrash.push(crash);
    }
  }

  closeModal(){
    this.route.navigate(["/judge"]);
  }

}
