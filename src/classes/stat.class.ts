import {Player} from './player.class';

export class Stat {
    _id: string;
    area: number;
    time: string;
    action: string;
    player_id: string;
    game_id: string;
    team_id: string;
    player?: Player;
}
