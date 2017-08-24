import {Injectable} from '@angular/core';
import {Team} from "../classes/team.class";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class BackStatProvider {
    public _token: string;
    public _uri: string = 'http://127.0.0.1:8080';

    public teams: Team[];
    public subject: Subject<Team[]> = new Subject<Team[]>();

    constructor() {
    }

    set_token(token: string) {
        this._token = token;
    }

    get_token() {
        return this._token;
    }

    get_uri() {
        return this._uri;
    }

    set_teams(teams: Team[]): void {
        this.teams = teams;
        this.subject.next(teams);
    }

    get_teams(): Observable<Team[]> {
        return this.subject.asObservable();
    }

    get_pure_teams(): Team[] {
        return this.teams;
    }
}
