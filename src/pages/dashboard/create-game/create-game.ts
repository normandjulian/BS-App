import { Team, TeamFull } from './../../../classes/team.class';
import { NavParams, ModalController, ViewController } from 'ionic-angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from '../dashboard-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Game } from "../../../classes/game.class";
import _ from 'lodash';
@Component({
  selector: 'page-create-game',
  templateUrl: 'create-game.html',
  providers: [DashboardService]
})

export class CreateGamePage {
  public team: TeamFull;
  public game_form: FormGroup;
  public menu_create: boolean;

  constructor(
    private service: DashboardService,
    private fb: FormBuilder,
    private params: NavParams,
    private view: ViewController) {

    // #TODO Add a input mask for the time
    this.game_form = this.fb.group({
      opponent: ['', [<any>Validators.required]],
      date: [new Date().toISOString(), [<any>Validators.required]],
      time: ['20:00', [Validators.pattern('([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')]],
      period: this.fb.group({
        type: [4, [<any>Validators.required]],
        time: [10, [<any>Validators.required]]
      }),
      home: [true, []]
    });
  }

  /**
   * Create a new game
   * @param {Game} game 
   * @param {boolean} isValid 
   */
  public create(game: Game, isValid: boolean) {
    game.team_id = this.team._id;
    game.players = _.filter(this.team.players, (player) => {
      return (!player.dnp);
    }).map((player) => {
      return player._id;
    });
    this.service.create_game(game).subscribe(
      (response: Game) => {
        this.view.dismiss(response);
      },
      (err) => console.log(err)
    );
  }

  ionViewDidLoad() {
    this.team = this.params.data;
    this.game_form.patchValue({
      period: {
        type: (this.team.period && this.team.period.type) ? this.team.period.type : 4,
        time: (this.team.period && this.team.period.time) ? this.team.period.time : 10,
      }
    });
  };
}
