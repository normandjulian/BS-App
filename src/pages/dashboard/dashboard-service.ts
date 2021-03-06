import { Game, GameFull } from './../../classes/game.class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Team, TeamFull } from '../../classes/team.class';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BackStatProvider } from "../../providers/back-stat.provider";
import { HttpClient } from "@angular/common/http";
import { Player } from "../../classes/player.class";

@Injectable()
export class DashboardService {
    // Initialisation for the storage api
    constructor(public http: HttpClient,
        public bs: BackStatProvider) {
    }

    /**
     * Get the list of all the teams
     * @returns {Observable<Team[]>}
     */
    get_teams(): Observable<Team[]> {
        return this.http.get<Team[]>(`${this.bs.uri}/teams`);
    }

    /**
     * Get the actual team selected by the user
     * @param  {string}               team_id [the id of the team selected]
     * @return {Observable<TeamFull>}         [the team selected]
     */
    public get_team(team_id: string): Observable<TeamFull> {
        return this.http.get<TeamFull>(`${this.bs.uri}/teams/${team_id}/full`);
    }

    public create_player(player: Player): Observable<Player> {
        return this.http.post<Player>(`${this.bs.uri}/players`, player);
    }

    public update_player(player: Player): Observable<Player> {
        return this.http.put<Player>(`${this.bs.uri}/players/${player._id}`, player);
    }

    /************************************************************/
    /*************************** GAME ***************************/
    /************************************************************/

    /**
     * Create a game linked to its team with the attribute team_id
     * @param  {Game} game - The game to create
     * @returns {Observable<Team[]>} - The game created
     */
    public create_game(game: Game): Observable<Game> {
        return this.http.post<Game>(`${this.bs.uri}/games`, game);
    }

    /**
     * Get the actual game selected by the user
     * @param  {string}               game_id [the id of the game selected]
     * @return {Observable<GameFull>}         [the game selected]
     */
    public get_game(game_id: string): Observable<GameFull> {
        return this.http.get<GameFull>(`${this.bs.uri}/games/${game_id}/full`);
    }

    /*  delete_team(_id: String) {
     let headers = new Headers({ 'x-access-token': this.token });
     let options = new RequestOptions({ headers: headers });

     return this.http.delete(`${this.config.apiEndpoint}teams/${_id}`, options)
     .map((res: Response) => res.json())
     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
     }

     get_games(team_id: String): Observable<Game[]> {
     let headers = new Headers({ 'x-access-token': this.token });
     let options = new RequestOptions({ headers: headers });
     if (this.config.network) {
     return this.http.get(`${this.config.apiEndpoint}teams/${team_id}/games`, options)
     .map((res: Response) => res.json())
     .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
     } else {
     let games = GAMES.filter(game => {
     return game.team_id === team_id;
     });
     return Observable.of(games);
     }
     }*/
}
