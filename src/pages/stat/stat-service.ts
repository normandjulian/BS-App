import { Storage } from '@ionic/storage';
import { Game, GameFull } from './../../classes/game.class';
import { Stat } from './../../classes/stat.class';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BackStatProvider } from "../../providers/back-stat.provider";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StatService {
    private _game: GameFull;
    private stats: Stat[];

    constructor(
        public http: HttpClient,
        public bs: BackStatProvider,
        public storage: Storage) {
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
    public get_game(game_id: string): Observable<Game> {
        return this.http.get<Game>(`${this.bs.uri}/prepare-games/${game_id}`);
    }

    /**
     * Return a virgin stat
     * @returns {Stat}
     */
    public get_virgin_stat(): Stat {
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

    /**
     * Initialise the storage to have the game stored
     */
    public setup_storage(game: Game) {
        this.game = game;
        this.storage.get(this.game._id).then(
            (response: any) => {
                if (!response) {
                    // Else I create it
                    this.storage.set(this.game._id, JSON.stringify({
                        _id: this.game._id,
                        stats: []
                    }));
                } else {
                    this.stats = response.stats;
                }
            }
        );
    }

    public store_stat(stat: Stat): any {
        this.storage.get(this.game._id).then(
            (res) => {
                if (res) {
                    // Get the game from the Storage
                    let game = JSON.parse(res);

                    // Get the numbers of stats and set it as tempory identifier
                    const _id = game.stats.length;

                    // Add the identifier to the stat
                    stat._id = String(_id);

                    // Add the stat
                    game.stats.push(stat);

                    // Store the game
                    this.storage.set(this.game._id, JSON.stringify(game));

                }
            }
        );
    }
}
