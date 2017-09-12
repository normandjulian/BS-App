import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {TeamService} from './create-team-service';
import {BackStatProvider} from "../../providers/back-stat.provider";
import {Team, TeamFull} from "../../classes/team.class";

@Component({
    selector: 'page-create-team',
    templateUrl: 'create-team.html',
    providers: [TeamService]
})
export class CreateTeamPage implements OnInit {
    public team_form = null;

    constructor(public viewCtrl: ViewController,
                public bs: BackStatProvider,
                public fb: FormBuilder,
                public service: TeamService) {
    }

    /**
     * Save (update or create) the current team
     * @param  {[Object]} value [description]
     */
    create(value) {
        let teams: Team[];
        this.service.create_team(value).subscribe(
            (team: Team) => {
                this.service.get_team_full(team._id).subscribe(
                    (team_full: TeamFull) => {
                        teams = this.bs.get_pure_teams();
                        teams.push(team_full);
                        this.bs.set_teams(teams);
                        this.viewCtrl.dismiss();
                    }
                )
            },
            err => console.error(err)
        )
    }

    ngOnInit() {
        // The form for the team
        this.team_form = this.fb.group({
            name: ['', [<any>Validators.required]],
            coach: ['', []],
            period: this.fb.group({
                type: [4, [<any>Validators.required]],
                time: [10, [<any>Validators.required]]
            }),
        });
    };
}
