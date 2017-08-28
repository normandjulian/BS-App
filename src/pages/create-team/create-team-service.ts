import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BackStatProvider} from "../../providers/back-stat.provider";
import {HttpClient} from "@angular/common/http";
import {TeamFull} from "../../classes/team.class";

@Injectable()
export class TeamService {
    constructor(public http: HttpClient, public bs: BackStatProvider) {
    }

    /**
     * Create a new team
     * @param {Team} team
     * @returns {Observable<Team>}
     */
    create_team(team): Observable<Object> {
        return this.http.post(`${this.bs.get_uri()}/teams`, team);
    }

    /**
     * Get the actual team selected by the user
     * @param  {string}               team_id [the id of the team selected]
     * @return {Observable<TeamFull>}         [the team selected]
     */
    get_team_full(team_id: string): Observable<TeamFull> {
        return this.http.get<TeamFull>(`${this.bs.get_uri()}/teams/${team_id}/full`);
    }
}
