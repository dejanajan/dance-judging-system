import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dance } from '../shared/general';

@Injectable({
  providedIn: 'root'
})
export class JudgeApiService {

  PHP_API_SERVER = "http://127.0.0.1:8080";
  BASE_GET: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/GET/`;
  BASE_URL_GET: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/GET/Judge/`;
  BASE_URL_POST: string = `${this.PHP_API_SERVER}/dancejudgingsystem/dancejudgingsystem/backend/POST/Judge/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getCompetitionsList(user: string): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + 'Last/getCompetitionsList.php', {user});
  }

  getDanceLast(): Observable<Dance[]>{
    return this.httpClient.get<Dance[]>(this.BASE_URL_GET + 'Last/getDanceLast.php');
  }

  getCompetitionCouples(username: string, dance_style: number, dance_category: number, age_group: number, adj_component: number){
    return this.httpClient.post<any[]>(this.BASE_URL_GET + 'Last/getCompetitionCouples.php', {username, dance_style, dance_category, age_group, adj_component});
  }

  /** URBAN GET */

  getCompetitionsListUrban(user: string): Observable<any[]>{
    return this.httpClient.post<any[]>(this.BASE_URL_GET + 'Urban/getCompetitionList.php', {user});
  }

  getCompetitionTeams(username: string, dance_style: number, dance_category: number, age_group: number){
    return this.httpClient.post<any[]>(this.BASE_URL_GET + 'Urban/getCompetitionTeams.php', {username, dance_style, dance_category, age_group});
  }


  /** POST */

  postMarks(couple_id, round_id, adjucator_id, dance_id, mark){
    return this.httpClient.post<any[]>(this.BASE_URL_POST + 'Last/postMarks.php', {couple_id, round_id, adjucator_id, dance_id, mark});
  }

   /** URBAN POST */

  postMarkUrban(team_id, round_id, adjucator_id, mark) {
    return this.httpClient.post<any[]>(this.BASE_URL_POST + 'Urban/postMarks.php', {team_id, round_id, adjucator_id, mark});
  }
}
