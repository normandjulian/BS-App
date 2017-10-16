import { StatPage } from './../../stat/stat';
import { GameFull } from './../../../classes/game.class';
import { NavController } from 'ionic-angular';
import { Component, Input, OnInit } from '@angular/core';
import { TeamFull } from '../../../classes/team.class';

@Component({
    selector: 'app-detail-game',
    templateUrl: 'detail-game.html'
})

export class DetailGameComponent implements OnInit {
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

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.goto_stat()
    }

}
