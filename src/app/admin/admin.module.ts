import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { LatinandstandardComponent } from './latinandstandard/latinandstandard.component';
import { UrbanComponent } from './urban/urban.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RankingComponent } from './latinandstandard/ranking/ranking.component';
import { ResultsComponent } from './latinandstandard/results/results.component';
import { CouplesComponent } from './latinandstandard/couples/couples.component';
import { CompetitionComponent } from './latinandstandard/competition/competition.component';
import { AdjucatorsComponent } from './latinandstandard/adjucators/adjucators.component';
import { UrbanRankingComponent } from './urban/urban-ranking/urban-ranking.component';
import { UrbanResultsComponent } from './urban/urban-results/urban-results.component';
import { UrbanAdjucatorsComponent } from './urban/urban-adjucators/urban-adjucators.component';
import { UrbanTeamComponent } from './urban/urban-team/urban-team.component';
import { UrbanCompetitionComponent } from './urban/urban-competition/urban-competition.component';
import { TableFilterPipe } from '../pipe/table-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [LatinandstandardComponent, UrbanComponent, RankingComponent, ResultsComponent, CouplesComponent, CompetitionComponent, AdjucatorsComponent, UrbanRankingComponent, UrbanResultsComponent, UrbanAdjucatorsComponent, UrbanTeamComponent, UrbanCompetitionComponent, TableFilterPipe],
  imports: [
    HttpClientModule,
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [DatePipe],
})
export class AdminModule { }
