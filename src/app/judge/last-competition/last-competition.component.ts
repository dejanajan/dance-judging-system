import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { JudgeApiService } from '../judge-api.service';
import { CountdownComponent } from "ngx-countdown";
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-competition',
  templateUrl: './last-competition.component.html',
  styleUrls: ['./last-competition.component.scss']
})
export class LastCompetitionComponent implements OnInit {
  @ViewChild("countdown") counter: CountdownComponent;

  inputLa = [1, 2, 3, 4, 5];
  inputSt = [6, 7, 8, 9, 10];
  inputTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  inputPattern = "(?=.)([+]?([0-9]*)(\.([0-9]+))?)";

  competition: any[];
  dances: any[];
  heats: any[] = [];
  pickHeat: any[] = [];
  timer: NodeJS.Timeout;
  count: NodeJS.Timeout;
 
  addMarksForm: FormGroup;
  couples: any;
  competitior: FormArray;

  marksFormInvalid: boolean = false;
  arrChoosenComp: any[] = [];

  @ViewChild('successModal') successModal;

  constructor(
    private apiService: JudgeApiService,
    private route: Router,
  ) { 

  }

  ngOnInit(): void {
    this.getDances();
    this.getCompetitionDetails();
    this.validateMarksForm();
  }

  
  validateMarksForm(){
    this.addMarksForm = new FormGroup({
      couples: new FormArray([])
    });
  }

  getControl(form){
    return form.controls.couples.controls;
  }

  getPoints(form){
    return form.controls.points.controls;
  }
 
  onSubmitMarksForm(marksForm){
    if(marksForm.valid){
      this.marksFormInvalid = false;
      for(let comp of marksForm.value.couples){
        const couple_id = comp.c_id;
        const round_id = comp.round_id;
        const adjucator_id = comp.adj_id;
        for (let point of comp.points){
          const mark = point.mark;
          const dance = point.dance;
          this.apiService.postMarks(couple_id, round_id, adjucator_id, dance, mark ).subscribe(
            (response) => {
              console.log(response)
            },
            (error) => console.log(error),
            () => {this.successModal.nativeElement.className = 'modal fade show'; }
          )                
        }
      }
    } else {
      this.marksFormInvalid = true;
    }
      
  }

/** define couple data for array */
  coupleData() {
    return new FormGroup({
      c_id: new FormControl(''),
      dc_style_id: new FormControl(''),
      ag_id: new FormControl(''),
      round_id: new FormControl(''),
      dc_id: new FormControl(''),
      adj_id: new FormControl(''),
      points: new FormArray([
      ]),
    })
  }

  /** add mark and dance inside points array */
  mark(dc){
     return new FormGroup({
      mark: new FormControl('', [Validators.required, Validators.pattern(this.inputPattern), Validators.minLength(2)]),
      dance: new FormControl(dc)
    })
  }

  /** add couples as array */
  addCouplesArray(){
      const control = <FormArray>this.addMarksForm.get('couples');
      control.push(this.coupleData());  
  }

  /** points array */
  addPointsArray(j, dc){
    const control = <FormArray>this.addMarksForm.get('couples')['controls'][j].get('points');
    control.push(this.mark(dc));
  }

  /** define data for one couple inside couples array  */
  addCoupleData(j, id, dcs_id, age, round, dc_id, adj_id){
    const coupleId = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('c_id');
    const danceStyle = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('dc_style_id');
    const ageGroupId = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('ag_id');
    const roundId = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('round_id');
    const danceCoupleId = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('dc_id');
    const adjucatorId = <FormControl>this.addMarksForm.get('couples')['controls'][j].get('adj_id');
    coupleId.setValue(id);
    danceStyle.setValue(dcs_id);
    ageGroupId.setValue(age);
    roundId.setValue(round);
    danceCoupleId.setValue(dc_id);
    adjucatorId.setValue(adj_id);
  }

 
  getCompetitionDetails(){
    const username = localStorage.getItem('token');
    const index = localStorage.getItem('index');
    this.arrChoosenComp = [];
    this.apiService.getCompetitionsList(username).subscribe((details: any[]) => {
      this.competition = details;

      this.arrChoosenComp.push(details[index]);

      this.apiService.getCompetitionCouples(username, details[index].dance_style_id, details[index].dance_category_id, details[index].age_group_id, details[index].component_id).subscribe((couples: any) => {
        this.couples = couples;

        if(details[index].dance_style_id == 1){
          for(let j = 0; j < couples.length; j++){
            this.addCouplesArray();
            for(let i = 0; i < this.inputSt.length; i++){
              this.addPointsArray(j, this.inputSt[i]);
              this.addCoupleData(j, couples[j].couple_id, details[index].dance_style_id, details[index].age_group_id, couples[j].round_id, couples[j].dance_couple_id, couples[j].adj_id);
            }
          }
        } else if (details[index].dance_style_id == 2) {
          for(let j = 0; j < couples.length; j++){ 
            this.addCouplesArray();
            for(let i = 0; i < this.inputLa.length; i++){
              this.addPointsArray(j, this.inputLa[i]);
              this.addCoupleData(j, couples[j].couple_id, details[index].dance_style_id, details[index].age_group_id, couples[j].round_id, couples[j].dance_couple_id, couples[j].adj_id);
            }
          }
        } else if (details[index].dance_style_id == 3) {
          for(let j = 0; j < couples.length; j++){  
            this.addCouplesArray();
            for(let i = 0; i < this.inputTen.length; i++){
              this.addPointsArray(j, this.inputTen[i]);
              this.addCoupleData(j, couples[j].couple_id, details[index].dance_style_id, details[index].age_group_id, couples[j].round_id, couples[j].dance_couple_id, couples[j].adj_id);
            }
          }
        }
      });

      this.apiService.getDanceLast().subscribe((dc: any[]) => {
        if (details[index].dance_style_id == 1){
          this.pickHeat.push("English Waltz");
          dc.forEach((item, index) => {
            if(index >=5 && index <=9){
              this.heats.push(item.last_dance_name);
            }
          });
        } else if (details[index].dance_style_id == 2){
          this.pickHeat.push("Cha-cha-cha");
          dc.forEach((item, index) => {
            if(index >=0 && index <=4){
              this.heats.push(item.last_dance_name);
            }
          });
        } else if (details[index].dance_style_id == 3) {
          this.pickHeat.push("Cha-cha-cha");
          dc.forEach((item, index) => {
            if(index >=0 && index <=9){
              this.heats.push(item.last_dance_name);
            }
          });
        }

        let counter = 1;
  
        this.timer = setInterval(() => {
          this.counter.restart()        
          this.pickHeat.length = 0;
          this.pickHeat.push(this.heats[counter++]);

          if(details[index].dance_style_id == 1 || details[index].dance_style_id == 2  && counter >= 5){
            clearInterval(this.timer);
          }
          if(details[index].dance_style_id == 3 && counter >= 10){
            clearInterval(this.timer);
          }
        }, 90000);
      });

    });
  }

  getDances(){
    this.apiService.getDanceLast().subscribe((dances: any[]) => {
      this.dances = dances;
    })
  }

  closeModal(){
    this.route.navigate(["/judge"]);
  }
}
