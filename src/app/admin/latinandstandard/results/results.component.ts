import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  resultsForm: FormGroup;
  danceStyleLaSt: any[];
  ageGroup: any[];
  dances: any[];
  heats: any[];
  danceCategoryLaSt: any[];
  page: number = 1;
  marks: any[];
  showTable: boolean = false;
  score: any[];
  error: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getDanceStyleLaSt();
    this.getAgeGroupLaSt();
    this.getDanceCategoryLaSt();
    this.getDance();
    this.getHeat();
   this.validateFormAdjucator();
  }

  validateFormAdjucator(){
    this.resultsForm = new FormGroup({
      danceStyle: new FormControl('1'),
      ageGroup: new FormControl('1'),
      danceCategory: new FormControl('1'),
      dance: new FormControl('0'),
      round: new FormControl('1'),
    })
  }

  onSubmitResultsForm(resultsForm){
    this.apiService.getMarks(resultsForm.round, resultsForm.danceStyle, resultsForm.danceCategory, resultsForm.ageGroup, resultsForm.dance).subscribe(
      (marks) => {
        this.marks = marks;
      },
      (error) => console.log(error)
    )
  }


  ranking(resultsForm){
    this.apiService.getMarks(resultsForm.round, resultsForm.danceStyle, resultsForm.danceCategory, resultsForm.ageGroup, resultsForm.dance).subscribe(
      (score) => {
        this.score = score;
        let uniqueIds = [... new Set(score.map(item => item.couple_id))];
        this.onCalculate(uniqueIds, resultsForm.round, resultsForm.danceStyle, resultsForm.danceCategory, resultsForm.ageGroup);

      },
      (error) => console.log(error)
    )

  }

  onCalculate(uniqueCoupleIds, round, dStyle, dCategory, ageGroup){
    let arrMarks = [];
    uniqueCoupleIds.forEach(item => {
      this.apiService.getCalculations(round, dStyle, dCategory, ageGroup, item).subscribe((score) => {
        arrMarks = [];
        score.forEach(key => {
          arrMarks.push(key.mark);
        });

        let endValue = this.calculateScore(arrMarks);
        this.apiService.postScore(item, round, dStyle, dCategory, ageGroup, endValue).subscribe(
          (response) => {console.log(response)},
          (error) => {if(error.status == 501){
            this.error = true;
          }}
        )
      })
    })
  }

/** Sort and calculate median */
  median(arr){
    arr.sort(function(a,b){
      return a-b;
    });

    var half = Math.floor(arr.length / 2);

    if(arr.length % 2){
      return Number(arr[half]);
    } else {
      return((Number(arr[half-1]) + Number(arr[half])) / 2.0);
    }
  }


  /** Calculate distance */
  weight(distance: number){
    return (1/(1+Math.pow(distance, 2)))*100;
  }

  /** Calculate end value */
  endScore(wMark:number, wWeight:number, median:number, bMark:number, bWeight:number){
    const value = (((wMark*wWeight) + median + (bMark*bWeight))/(1 + wWeight + bWeight));
    return Number(value.toFixed(2));
  }

  calculateScore(arrOfMarks) {
        let median = this.median(arrOfMarks);
        let worstMark = Math.min(...arrOfMarks);
        let bestMark = Math.max(...arrOfMarks);
        let worstDistance = median-worstMark;
        let bestDistance = bestMark-median;
        let worstWeight = Number(this.weight(worstDistance).toFixed(2));
        let bestWeight = Number((this.weight(bestDistance)).toFixed(2));
         
        return this.endScore(worstMark, worstWeight, median, bestMark, bestWeight);
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
