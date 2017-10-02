import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BackStatProvider } from "../../../providers/back-stat.provider";
import { HttpClient } from "@angular/common/http";
import { TeamFull } from "../../../classes/team.class";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TeamService {
    constructor(public http: HttpClient, public bs: BackStatProvider) {
    }

    /**
     * Create a new team
     * @param {Team} team
     * @returns {Observable<TeamFull>}
     */
    create_team(team): Observable<TeamFull> {
        return this.http.post<TeamFull>(`${this.bs.uri}/teams`, team);
    }
}
