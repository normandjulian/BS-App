import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Player } from '../../classes/player.class';
import { TeamFull } from '../../classes/team.class';
import { TeamService } from './team-service';

@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
  providers: [TeamService]
})
export class TeamPage implements OnInit {
  public team_form = null;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public fb: FormBuilder,
    public teamService: TeamService) { }

  /**
   * Save (update or create) the current team
   * @param  {[Object]} value [description]
   */
  create(value) {
      this.teamService.create_team(value).subscribe(
        res => console.log(res),
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
