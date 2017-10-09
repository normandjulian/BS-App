import { StatPage } from './../../stat/stat';
import { GameFull } from './../../../classes/game.class';
import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { TeamFull } from '../../../classes/team.class';

@Component({
    selector: 'app-detail-game',
    templateUrl: 'detail-game.html'
})

export class DetailGameComponent {
    @Input() game: GameFull;
    @Input() team: TeamFull;

    constructor(private navController: NavController) {}

    /**
     * Nav to the StatPage
     */
    public goto_stat(): void {
        this.navController.push(StatPage, {
            game_id: this.game._id
        });
    }

}
