import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-couples',
  templateUrl: './couples.component.html',
  styleUrls: ['./couples.component.scss']
})
export class CouplesComponent implements OnInit {
  danceStyleLaSt: any[];
  danceCategoryLaSt: any[];
  ageGroup: any[];

  addCouplesForm: FormGroup;
  couples: any[];
  showTable: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getDanceCategoryLaSt();
    this.getDanceStyleLaSt();
    this.getAgeGroupLaSt();
    this.validateFormCouples();
  }


  validateFormCouples(){
    this.addCouplesForm = new FormGroup({
      gentlemanName: new FormControl('', Validators.required),
      gentelmanSurname: new FormControl('', Validators.required),
      ladyName: new FormControl('', Validators.required),
      ladySurname: new FormControl('', Validators.required),
      danceStudio: new FormControl('', Validators.required),
      danceStyle: new FormControl('1', Validators.required),
      danceCategory: new FormControl('1', Validators.required),
      ageGroup: new FormControl('1', Validators.required),
      coupleId: new FormControl('', Validators.required),
    })
  }

  // dancer_name: string, dancer_surname: string, dance_club: string, age_group: string

  onSubmitCouplesForm(couplesForm){
    /** remember dancer  */
    this.apiService.postDancer(couplesForm.gentlemanName, couplesForm.gentelmanSurname, couplesForm.ladyName, couplesForm.ladySurname, couplesForm.danceStudio, couplesForm.ageGroup).subscribe(
      (response) => {console.log(response)},
      (error) => console.log(error)
    )

    /** remember couple */
    this.apiService.postCouples(couplesForm.coupleId, couplesForm.danceStyle, couplesForm.danceCategory, couplesForm.ageGroup).subscribe(
      (response) => {console.log('couple api response', response)},
      (error) => console.log('couples error', error)
    )
  }

  /** Get method */

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

  getCouples(form){
    this.apiService.getCouples(form.danceStyle, form.danceCategory, form.ageGroup).subscribe((couples: any[])=>{
      this.couples = couples;
    })
  }
}
