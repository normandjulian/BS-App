import { Team } from './../../../classes/team.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './../dashboard-service';
import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-team-detail',
  templateUrl: 'team-detail.html',
  providers: [DashboardService]
})

export class TeamDetailComponent implements OnInit {
    @Input() team;
    public team_form: FormGroup;
    
    constructor( private fb: FormBuilder) {

        // The form for the team
        this.team_form = this.fb.group({
            name: ['', [<any>Validators.required]],
            coach: ['', []],
            period: this.fb.group({
                type: [4, [<any>Validators.required]],
                time: [10, [<any>Validators.required]]
            })
        });
    }

    public create(team: Team) {
        console.log(team)
    }

    ngOnInit() {
        this.team_form.patchValue({
            name: this.team.name,
            coach: this.team.coach || null,
            period: {
                type: this.team.period.type,
                time: this.team.period.time
            }
        });
    }
}
