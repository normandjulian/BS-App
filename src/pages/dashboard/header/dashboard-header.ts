import { Observable } from 'rxjs/Observable';
import { AlertController, NavController, ModalController } from 'ionic-angular';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DashboardService } from '../dashboard-service';
import { Team, TeamFull } from '../../../classes/team.class';
import { CreateTeamPage } from '../create-team/create-team';
import { BackStatProvider } from "../../../providers/back-stat.provider";
import _ from 'lodash';

@Component({
    selector: 'app-dashboard-header',
    templateUrl: 'dashboard-header.html',
    providers: [DashboardService]
})

export class DashboardHeaderComponent implements OnInit {
    public teams$: Observable<Team[]>;
    public selected_team: TeamFull;
    public selected_team_id: string;
    public pane: string;
    @Output() team_full: EventEmitter<TeamFull> = new EventEmitter<TeamFull>();

    constructor(private navController: NavController,
        private service: DashboardService,
        private modalCtrl: ModalController,
        private bs: BackStatProvider) {

    }

    public team_change(team_id: string) {
        this.get_team(team_id);
    }

    public set_default_team(teams: Team[]) {
        this.selected_team_id = (teams.length !== 0) ? _.last(teams)._id : null;
        this.get_team(this.selected_team_id);
    }

    /**
     * GO TO -> Create a team
     */
    public goto_create_team(): void {
        this.modalCtrl.create(CreateTeamPage).present();
    }

    public get_team(team_id: string) {
        this.service.get_team(team_id).subscribe(
            (response: TeamFull) => {
                this.selected_team = response;
                this.team_full.emit(response);
                this.pane = (this.selected_team.players.length > 5) ? this.pane = 'games' : 'players';
            }
        );
    }

    ngOnInit() {
        this.teams$ = this.bs.get_teams();
        this.teams$.subscribe(
            (response: Team[]) => {
                this.set_default_team(response);
            }
        );

        this.service.get_teams().subscribe(
            (response: Team[]) => this.bs.set_teams(response),
            err => console.error(err)
        );
    };
}
