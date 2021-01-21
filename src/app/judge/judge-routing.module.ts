import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JudgeComponent } from './judge.component';
import { LastCompetitionComponent } from './last-competition/last-competition.component';
import { UrbanCompetitionComponent } from './urban-competition/urban-competition.component';

const routes: Routes = [
  {path: '', component: JudgeComponent},
  {path: 'last', component: LastCompetitionComponent},
  {path: 'urban', component: UrbanCompetitionComponent},
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class JudgeRoutingModule { }
