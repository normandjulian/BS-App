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
    public selected_team: string;
    @Output() team_id: EventEmitter<string> = new EventEmitter<string>();

    constructor(private navController: NavController,
        private service: DashboardService,
        private modalCtrl: ModalController,
        private bs: BackStatProvider) {

    }

    public team_change(team_id: string) {
        this.team_id.emit(this.selected_team);
    }

    public set_default_team(teams: Team[]) {
        this.selected_team = (teams.length !== 0) ? _.last(teams)._id : null;
        this.team_id.emit(this.selected_team);
    }

    /**
   * GO TO -> Create a team
   */
    public goto_create_team(): void {
        this.modalCtrl.create(CreateTeamPage).present();
    }

    ngOnInit() {
        this.teams$ = this.bs.get_teams();

        this.service.get_teams().subscribe(
            (response: Team[]) => this.bs.set_teams(response),
            err => console.error(err)
        );

        this.teams$.subscribe(
            (response: Team[]) => {
                this.set_default_team(response);
            }
        );
    };
}
