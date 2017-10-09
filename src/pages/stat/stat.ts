import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatService } from './stat-service';
import { Stat } from '../../classes/stat.class';
import { GameFull } from '../../classes/game.class';
import { Player } from '../../classes/player.class';
// import { ListStatsComponent } from './list-stats/list-stats.component';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
  providers: [StatService]
})
export class StatPage {
  public game: GameFull;
  public stat: Stat = null;
  public selectAction: boolean = true;
  public selectPlayer: boolean = true;
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
   * Initialise the storage
   * Get back or set my game
   */
  setup_storage() {
    const game_id = this.service.game._id;
    this.storage.get(game_id).then(
      (res) => {
        if (!res) {
          // Else I create it
          const game = {
            _id: game_id,
            stats: []
          };
          this.storage.set(game_id, JSON.stringify(game));
        }
      });
  }

  push_stat_2storage(stat: Stat) {
    // this.storage.get(this.game_id).then((res) => {
    //   if (res) {
    //     let game = JSON.parse(res);
    //     let _id = game.stats.length;

    //     stat._id = String(_id);
    //     game.stats.push(stat);

    //     this.storage.set(this.game_id, JSON.stringify(game));
    //     this.clean_stat();
    //   }
    // });
  }

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
    // this.stat.area = area;
    // this.stat.time = this.time;
    this.selectAction = false;
  }

  /**
   * Set the action of the stat
   * @param {string} action [the action selected]
   */
  tapOnAction(action: string): void {
    // this.stat['action'] = action;
    this.selectAction = true;
    this.selectPlayer = false;
  }

  tapOnPlayer(player: Player): void {
    // this.stat['player_id'] = player._id;
    // this.stat['player'] = player;
    // this.selectPlayer = true;

    // this.push_stat_2storage(this.stat);
    // this.statService.create_stat( this.stat ).subscribe(
    //   res => console.log( res ),
    //   err => console.log( err )
    // );
  }

  set_up(game_id: string) {
    this.service.get_game(game_id).subscribe(
      (response: GameFull) => {
        this.game = this.service.game;
        this.setup_storage();
      });
  }

  ionViewDidLoad() {
    // this.game_id =  || '5856b947c5242563c5a4cfbc';
    // this.team_id = this.navParams.get('team_id') || '5856b7bd80affe631645e390';
    this.set_up(this.navParams.get('game_id'));
  }

  presentProfileModal() {
    // let profileModal = this.modalCtrl.create(ListStatsComponent, { game_id: this.game_id });
    // profileModal.present();
  }
}
