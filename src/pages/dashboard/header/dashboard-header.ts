import { Observable } from 'rxjs/Observable';
import { ModalController } from 'ionic-angular';
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
    public team: TeamFull;
    public selected_team: Team;
    public pane: string;
    public hide_header: boolean;
    @Output() team_full: EventEmitter<TeamFull> = new EventEmitter<TeamFull>();
    @Output() panel: EventEmitter<string> = new EventEmitter<string>();

    constructor(private service: DashboardService,
        private modalCtrl: ModalController,
        private bs: BackStatProvider) {

        this.hide_header = false;
    }

    public ionChangeTeam() {
        if (this.selected_team._id !== this.team._id) {
            this.get_team(this.selected_team);
        }
    }

    public set_default_team(teams: Team[]) {
        if (teams.length !== 0) {
            this.hide_header = false;
            this.get_team(_.last(teams));
        } else {
            this.hide_header = true;
            this.team_full.emit();
        }
    }

    public switch_panel(panel: string) {
        this.panel.emit(panel);
    }

    /**
     * GO TO -> Create a team
     */
    public goto_create_team(): void {
        this.modalCtrl.create(CreateTeamPage).present();
    }

    public get_team(team: Team) {
        this.service.get_team(team._id).subscribe(
            (response: TeamFull) => {
                this.team = response;
                this.selected_team = team;
                this.team_full.emit(response);
            }
        );
    }

    ngOnInit() {
        // Bind the observable
        this.teams$ = this.bs.get_teams();

        // Subscriber to its changements
        this.teams$.subscribe(
            (response: Team[]) => {
                this.set_default_team(response);
            }
        );

        // Get the team and call the subject from backstat-provider
        this.service.get_teams().subscribe(
            (response: Team[]) => this.bs.set_teams(response),
            err => console.error(err)
        );
    };
}
