import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// import { StatService } from './stat-service';
import { Stat } from '../../classes/stat.class';
import { Player } from '../../classes/player.class';
// import { ListStatsComponent } from './list-stats/list-stats.component';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html'
//   providers: [StatService]
})
export class StatPage {
  public stat: Stat = null;
  public selectAction: boolean = true;
  public selectPlayer: boolean = true;
  public players: Player[] = null;
  public time: string;
  public timerSeconds: number = 330;
  public actions: string[] = ['ast', 'blk', 'dreb', 'oreb', 'pf', 'st', 'to'];
  public game_id: string = null;
  public team_id: string = null;

  /**
   * Constructor
   */
  constructor(
    public storage: Storage,
    public navController: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) { }

  /**
   * Initialise the storage
   * Get back or set my game
   */
  set_up_storage() {
    // this.storage.get(this.game_id).then((res) => {
    //   if (!res) {
    //     // Else I create it
    //     let game = {
    //       _id: this.game_id,
    //       stats: []
    //     };
    //     this.storage.set(this.game_id, JSON.stringify(game));
    //   }
    // });
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

  clean_stat() {
    // this.stat = {
    //   _id: null,
    //   area: null,
    //   time: null,
    //   action: null,
    //   player_id: null,
    //   game_id: this.game_id,
    //   team_id: this.team_id
    // };
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
    // this.selectAction = false;
  }

  /**
   * Set the action of the stat
   * @param {string} action [the action selected]
   */
  tapOnAction(action: string): void {
    // this.stat['action'] = action;
    // this.selectAction = true;
    // this.selectPlayer = false;
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

  set_up() {
    // this.set_up_storage();
    // this.players = [
    //   {
    //     _id: '0',
    //     firstname: 'Julian',
    //     lastname: 'Normand',
    //     number: 4,
    //     team_id: '5856b8f2bd6c1763b20faef5'
    //   },
    //   {
    //     _id: '1',
    //     firstname: 'jyujuyk',
    //     lastname: 'sdfs',
    //     number: 5,
    //     team_id: '5856b8f2bd6c1763b20faef5'
    //   },
    //   {
    //     _id: '2',
    //     firstname: 'eee',
    //     lastname: 'zerz',
    //     number: 7,
    //     team_id: '5856b8f2bd6c1763b20faef5'
    //   },
    // ];
    // this.statService.get_players(this.stat.team_id).subscribe(
    //   res => this.players = res,
    // )
    this.clean_stat();
  }

  ionViewDidLoad() {
    // this.game_id = this.navParams.get('game_id') || '5856b947c5242563c5a4cfbc';
    // this.team_id = this.navParams.get('team_id') || '5856b7bd80affe631645e390';
    this.set_up();
  }

  presentProfileModal() {
    // let profileModal = this.modalCtrl.create(ListStatsComponent, { game_id: this.game_id });
    // profileModal.present();
  }
}
