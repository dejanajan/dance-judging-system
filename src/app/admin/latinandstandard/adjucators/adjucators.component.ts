import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-adjucators',
  templateUrl: './adjucators.component.html',
  styleUrls: ['./adjucators.component.scss']
})
export class AdjucatorsComponent implements OnInit {
  addAdjucatorForm: FormGroup;
  adjucators: any[];
  showTable: boolean = false;
  
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.validateFormAdjucator();
  }

  validateFormAdjucator(){
    this.addAdjucatorForm = new FormGroup({
      adjucatorName: new FormControl('', Validators.required),
      adjucatorSurname: new FormControl('', Validators.required),
      adjucatorUsername: new FormControl('', Validators.required),
      adjucatorPassword: new FormControl('', Validators.required),
      adjucatorDanceStudio: new FormControl('', Validators.required),
      adjucatorCountry: new FormControl('', Validators.required),
      adjucatorOccupation: new FormControl('1', Validators.required),
    })
  }


  onSubmitAdjForm(adjForm){
    const flag_adjucator = 1;
    this.apiService.postUsers(adjForm.adjucatorUsername, adjForm.adjucatorPassword, adjForm.adjucatorName, adjForm.adjucatorSurname, adjForm.adjucatorDanceStudio, adjForm.adjucatorCountry, 1, Number(adjForm.adjucatorOccupation))
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log(error)
    )
  }

  getAdjucators(){
    const flag_adjucator = 1;
    this.apiService.getAdjucatorsGeneral(flag_adjucator).subscribe(adjs => {
      this.adjucators = adjs;
    })
  }

  get adjucatorName() { return this.addAdjucatorForm.get('adjucatorName');}
  get adjucatorSurname() { return this.addAdjucatorForm.get('adjucatorSurname');}
  get adjucatorUsername() { return this.addAdjucatorForm.get('adjucatorUsername');}
  get adjucatorPassword() { return this.addAdjucatorForm.get('adjucatorPassword');}
  get adjucatorDanceStudio() { return this.addAdjucatorForm.get('adjucatorDanceStudio');}
  get adjucatorCountry() { return this.addAdjucatorForm.get('adjucatorCountry');}
  get adjucatorOccupation() { return this.addAdjucatorForm.get('adjucatorOccupation');}

}
