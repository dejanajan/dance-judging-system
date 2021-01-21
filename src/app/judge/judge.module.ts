import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JudgeRoutingModule } from './judge-routing.module';
import { LastCompetitionComponent } from './last-competition/last-competition.component';
import { UrbanCompetitionComponent } from './urban-competition/urban-competition.component';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LastCompetitionComponent, UrbanCompetitionComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    JudgeRoutingModule,
    CountdownModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class JudgeModule { }
