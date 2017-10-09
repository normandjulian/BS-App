import { Game, GameFull } from './../../classes/game.class';
import { Stat } from './../../classes/stat.class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BackStatProvider } from "../../providers/back-stat.provider";
import { HttpClient } from "@angular/common/http";
import { Player } from "../../classes/player.class";

@Injectable()
export class StatService {
    private _game: GameFull;

    constructor(public http: HttpClient,
        public bs: BackStatProvider) {
    }

    set game(game: Game) {
        this._game = game;
    }

    get game() {
        return this._game;
    }

    /**
     * Get the game
     * @returns {Observable<Game>}
     */
    get_game(game_id: string): Observable<Game> {
        return this.http.get<Game>(`${this.bs.uri}/prepare-games/${game_id}`)
            .map((response: Game) => this.game = response);
    }

    get_pure_stat(): Stat {
        return {
            _id: null,
            area: null,
            time: null,
            action: null,
            player_id: null,
            game_id: this.game._id,
            team_id: this.game.team_id
        }
    }
}
