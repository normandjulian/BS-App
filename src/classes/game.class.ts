import { Player } from './player.class';

export class Game {
    _id?: string;
    opponent?: string;
    date?: Date;
    home?: boolean;
    team_id?: string;
    stats?: any[];
    players?: Player[];
}
export class GameFull {
    _id?: string;
    opponent?: string;
    date?: Date;
    home?: boolean;
    team_id?: string;
    stats?: any[];
    players?: Player[];
    actions?: any[];
}
