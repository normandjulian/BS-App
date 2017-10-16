import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatService } from './stat-service';
import { Stat } from '../../classes/stat.class';
import { GameFull } from '../../classes/game.class';
import { Player } from '../../classes/player.class';
import { ListStatsComponent } from './list-stats/list-stats';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
  providers: [StatService]
})
export class StatPage {
  public game: GameFull;
  public stat: Stat = null;
  public hide_actions: boolean = true;
  public hide_players: boolean = true;
  public players: Player[] = null;
  public time: string;
  public timerSeconds: number = 330;
  public actions: string[] = ['ast', 'blk', 'dreb', 'oreb', 'pf', 'st', 'to'];
  public team_id: string = null;

  /**
   * Constructor
   */
  constructor(
    public storage: Storage,
    public navController: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private service: StatService) { }

  /**
   * Get back the time
   * @param  {_time} value [the time of the game]
   */
  getTime(time: string) {
    // this.time = time;
  }

  /**
   * Set the area of the
   * @param {number} _area [the area clicked]
   */
  tapOnCourt(area: number): void {
    this.stat['area'] = area;
    // this.stat.time = this.time;
    this.hide_actions = false;
  }

  /**
   * Set the action of the stat
   * @param {string} action [the action selected]
   */
  tapOnAction(action: string): void {
    this.stat['action'] = action;
    this.hide_actions = true;
    this.hide_players = false;
  }

  tapOnPlayer(player: Player): void {
    this.stat['player_id'] = player._id;
    this.stat['player'] = player;

    this.hide_players = true;

    this.service.store_stat(this.stat);

    this.stat = this.service.get_virgin_stat();
  }

  public set_up(game_id: string) {
    this.service.get_game(game_id).subscribe(
      (response: GameFull) => {
        this.game = response;
        this.service.setup_storage(response);
        this.stat = this.service.get_virgin_stat();
      });
  }

  ionViewDidLoad() {
    this.set_up(this.navParams.get('game_id'));
  }

  openListStats() {
    let listStats = this.modalCtrl.create(ListStatsComponent, { game_id: this.service.game._id }).present();
  }
}
