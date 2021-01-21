import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgeGroup, Competition, Component, Dance, DanceCategory, DanceStyle, Judge, Round } from '../shared/general';
import { Users } from '../shared/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1:8080";
  BASE_URL_GET: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/GET`;
  BASE_URL_POST: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/POST`;

  constructor(
    private httpClient: HttpClient
  ) { }

  /** GET */

  /** GENERAL */
  getCometitionEvent(): Observable<Competition[]>{
    return this.httpClient.get<Competition[]>(this.BASE_URL_GET + '/Common/getCompetitionEvent.php');
  }

  getAdjSignID(): Observable<Judge[]>{
    return this.httpClient.get<Judge[]>(this.BASE_URL_GET + '/Common/getAdjSignID.php');
  }

  getHeat(): Observable<Round[]>{
    return this.httpClient.get<Round[]>(this.BASE_URL_GET + '/Common/getHeat.php');
  }

  getAdjucatorsGeneral(occupation_id: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Common/getAdjucators.php', {occupation_id});
  }

  /** LAST */
  getDanceCategoryLaSt(): Observable<DanceCategory[]>{
    return this.httpClient.get<DanceCategory[]>(this.BASE_URL_GET + '/Admin/Last/getDanceCategoryLaSt.php');
  }

  getDanceStyleLaSt(): Observable<DanceStyle[]>{
    return this.httpClient.get<DanceStyle[]>(this.BASE_URL_GET + '/Admin/Last/getDanceStyleLaSt.php');
  }

  getAgeGroupLaSt(): Observable<AgeGroup[]>{
    return this.httpClient.get<AgeGroup[]>(this.BASE_URL_GET + '/Admin/Last/getAgeGroupLaSt.php');
  }

  getDanceLast(): Observable<Dance[]>{
    return this.httpClient.get<Dance[]>(this.BASE_URL_GET + '/Admin/Last/getDanceLast.php');
  }

  getComponent(): Observable<Component[]>{
    return this.httpClient.get<Component[]>(this.BASE_URL_GET + '/Admin/Last/getComponent.php');
  }

  getCouples(dance_style: number, dance_category: number, age_group: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Last/getCouples.php', {dance_style, dance_category, age_group});
  }

  getCompetitions(competition_event: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Last/getCompetitions.php', {competition_event});
  }

  getMarks(round: number, dance_style: number, dance_category: number, age_group: number, last_dance_id: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Last/getMarks.php', {round, dance_style, dance_category, age_group, last_dance_id})
  }

  getCalculations(round: number, dance_style: number, dance_category: number, age_group: number, couple_id: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Last/getCalculation.php', {round, dance_style, dance_category, age_group, couple_id})
  }

  getScore(round: number, dance_style: number, dance_category: number, age_group: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Last/getScore.php', {round, dance_style, dance_category, age_group})
  }

  /** URBAN */

  getAgeGroupUrban(): Observable<AgeGroup[]>{
    return this.httpClient.get<AgeGroup[]>(this.BASE_URL_GET + '/Admin/Urban/getAgeGroupUrban.php');
  }

  getDanceCategoryUrban(): Observable<any[]>{
    return this.httpClient.get<DanceCategory[]>(this.BASE_URL_GET + '/Admin/Urban/getDanceCategoryUrban.php');
  }

  getDanceStyleUrban(): Observable<DanceStyle[]>{
    return this.httpClient.get<DanceStyle[]>(this.BASE_URL_GET + '/Admin/Urban/getDanceStyleUrban.php');
  }

  getResult(round: number, dance_style: number, dance_category: number, age_group: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Urban/getResults.php', {round, dance_style, dance_category, age_group})
  }

  getCalculationsResult(round: number, dance_style: number, dance_category: number, age_group: number, team_id: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Urban/getCalculationsResult.php', {round, dance_style, dance_category, age_group, team_id});
  }

  getScoreUrban(round: number, dance_style: number, dance_category: number, age_group: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Urban/getScoreUrban.php', {round, dance_style, dance_category, age_group});
  }

  getCompetitionsUrban(competition_event: number): Observable<any[]>{
    console.log('CE', competition_event);
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Urban/getCompetitions.php', {competition_event});
  }

  getTeams(dance_style: number, dance_category: number, age_group: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Admin/Urban/getTeams.php', {dance_style, dance_category, age_group});
  }

  /** POST */

  /** GENERAL */
  
  getAdjucators(flag_dance_category: number): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + '/Common/getUsers.php', {flag_dance_category});
  }

    // these are adjucators
  postUsers(username: string, password: string, name: string, surname: string, dance_studio: string, country:string, flag_adjucator: number, flag_dance_category: number) {
    return this.httpClient.post<Users[]>(this.BASE_URL_POST + '/Common/postUser.php', {username, password, name, surname, dance_studio, country, flag_adjucator, flag_dance_category})
  }

  /** LAST */

  postCouples(couple_id:number, dance_style:number, dance_category:number, age_group: number){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postCouples.php', {couple_id, dance_style, dance_category, age_group});
  }

  postDancer(gentleman_name: string, gentleman_surname: string, lady_name: string, lady_surname:string, dance_club: string, age_group: number){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postDancer.php', {gentleman_name, gentleman_surname, lady_name, lady_surname, dance_club, age_group});
  }

  postCompetition(competition_date: Date, competition_event: number, competition_style: number, competition_category: number, competition_age_group: number, competition_num_round: number, competition_num_couples: number) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postCompetition.php', {competition_date, competition_event, competition_style, competition_category, competition_age_group, competition_num_round, competition_num_couples});
  }

  postRound(competition_num_round: number, competition_num_couples: number) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postRound.php', {competition_num_round, competition_num_couples});
  }

  postAdjucatorRound(competition_adjucator_sign: number, competition_adj_component: number, competition_adjucator_id:number){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postAdjucatorRound.php', {competition_adjucator_sign, competition_adj_component, competition_adjucator_id});
  }

  postScore(couple_id, round_id, ranking_dance_style, ranking_dance_category, ranking_age_group, ranking_end_score ){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Last/postScore.php', {couple_id, round_id, ranking_dance_style, ranking_dance_category, ranking_age_group, ranking_end_score});
  }

  /** POST URBAN */

  postTeam(team_name: string, team_studio: string, team_id:number, team_style:number, team_category:number, age_group: number) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Urban/postTeam.php', {team_name, team_studio, team_id, team_style, team_category, age_group});
  }

  postCompetitionTeam(competition_date: Date, competition_event: number, competition_style: number, competition_category: number, competition_age_group: number, competition_num_round: number, competition_num_team: number) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Urban/postCompetition.php', {competition_date, competition_event, competition_style, competition_category, competition_age_group, competition_num_round, competition_num_team});
  }

  postRoundTeam(competition_num_round: number, competition_num_team: number) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Urban/postRound.php', {competition_num_round, competition_num_team});
  }

  postAdjucatorRoundTeam(competition_adjucator_sign: number, competition_adjucator_id:number){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Urban/postAdjucatorRound.php', {competition_adjucator_sign, competition_adjucator_id});
  }

  postScoreUrban(team_id, round_id, ranking_dance_style, ranking_dance_category, ranking_age_group, ranking_end_score ){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + '/Admin/Urban/postScoreUrban.php', {team_id, round_id, ranking_dance_style, ranking_dance_category, ranking_age_group, ranking_end_score});
  }

}
