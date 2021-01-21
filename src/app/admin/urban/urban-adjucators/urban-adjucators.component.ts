import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-urban-adjucators',
  templateUrl: './urban-adjucators.component.html',
  styleUrls: ['./urban-adjucators.component.scss']
})
export class UrbanAdjucatorsComponent implements OnInit {
  addUrbanAdjucatorForm: FormGroup;
  showTable: boolean = false;
  adjucators: any[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.validateFormAdjucator();
  }

  validateFormAdjucator(){
    this.addUrbanAdjucatorForm = new FormGroup({
      adjUName: new FormControl('', Validators.required),
      adjUSurname: new FormControl('', Validators.required),
      adjUUsername: new FormControl('', Validators.required),
      adjUPassword: new FormControl('', Validators.required),
      adjUDanceStudio: new FormControl('', Validators.required),
      adjUCountry: new FormControl('', Validators.required),
      adjUOccupation: new FormControl('3', Validators.required),
    })
  }

  onSubmitUrbanAdjForm(adjForm){
    const flag_adjucator = 1;
    this.apiService.postUsers(adjForm.adjUUsername, adjForm.adjUPassword, adjForm.adjUName, adjForm.adjUSurname, adjForm.adjUDanceStudio, adjForm.adjUCountry, 1, Number(adjForm.adjUOccupation))
    .subscribe(
      (response) => {console.log(response)},
      (error) => console.log(error)
    )
  }

  getAdjucators(){
    const flag_dance_category = 3;
    this.apiService.getAdjucatorsGeneral(flag_dance_category).subscribe(adjs => {
      this.adjucators = adjs;
    })
  }

  get adjUName() { return this.addUrbanAdjucatorForm.get('adjUName');}
  get adjUSurname() { return this.addUrbanAdjucatorForm.get('adjUSurname');}
  get adjUUsername() { return this.addUrbanAdjucatorForm.get('adjUUsername');}
  get adjUPassword() { return this.addUrbanAdjucatorForm.get('adjUPassword');}
  get adjUDanceStudio() { return this.addUrbanAdjucatorForm.get('adjUDanceStudio');}
  get adjUCountry() { return this.addUrbanAdjucatorForm.get('adjUCountry');}
  get adjUOccupation() { return this.addUrbanAdjucatorForm.get('adjUOccupation');}
}
