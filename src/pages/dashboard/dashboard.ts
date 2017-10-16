import { StatPage } from './../stat/stat';
import { GameFull } from './../../classes/game.class';
import { AlertController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { Game } from '../../classes/game.class';
import { Team, TeamFull } from '../../classes/team.class';
import { Player } from '../../classes/player.class';
import { CreateTeamPage } from './create-team/create-team';
import { CreateGamePage } from "./create-game/create-game";
import _ from 'lodash';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})

export class DashboardPage {
  public team: TeamFull;
  public pane: string;
  public selected_player: Player;
  public selected_game: GameFull;
  public layout: any = {
    zero_player: false,
    create_player: false,
    zero_game: false,
    create_game: false
  };

  constructor(private service: DashboardService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController) {

  }

  delete_team(_id) { }

  /**
   * Store the game selected by the user
   * @param  {Game} game [description]
   */
  select_game(game: Game) {
    if ((this.selected_game === game) || (game === null)) {
      this.selected_game = null;
    } else {
      this.selected_game = game;
    }
  }

  /**
   * Display a notification for the user
   * @param  {string} title    [The title of the notification]
   * @param  {string} message  [Its message]
   * @param  {string} btnLabel [The text of the button]
   * @param  {any}    callback [Any function to pass after the notification]
   */
  notification(title: string, message: string, btnLabel: string, callback: any): void {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: btnLabel,
          handler: () => callback()
        }
      ]
    }).present();
  }

  public switch_panel(panel: string) {
    this.pane = panel;
  }

  /************************************************************/
  /*************************** STAT ***************************/
  /************************************************************/

  /************************************************************/
  /*************************** TEAM ***************************/
  /************************************************************/

  /*
   * Select the team which the user tap on it
   */


  switch_team(team: TeamFull) {
    if (!team) {
      this.no_team_mode();
    } else {
      this.team = team;
      const players_length = this.team.players.length;

      this.pane = 'players';

      // If there's no player
      if (players_length === 0) {
        this.layout.zero_player = true;
      } else if (this.team.players.length < 5) {
        // If there's less than 5 players
        this.selected_player = _.first(this.team.players);
      } else {
        this.selected_player = _.first(this.team.players);
        this.pane = 'games';
        if (this.team.games.length === 0) {
          this.layout.zero_game = true;
        } else {
          this.get_game(_.first(this.team.games));
        }
      }
    }
  }

  public no_team_mode() {

  }

  /**
   * GO TO -> Create a team
   */
  goto_create_team(): void {
    this.modalCtrl.create(CreateTeamPage).present();
  }

  /************************************************************/
  /*************************** GAME ***************************/
  /************************************************************/

  public goto_create_game() {
    let create_game_page = this.modalCtrl.create(CreateGamePage, this.team);
    create_game_page.onDidDismiss(
      (response: Game) => {
        if (response) {
          this.team.games.push(response);
        }
      }
    );
    create_game_page.present();
  }

  public get_game(game: Game) {
    if (!this.selected_game || (this.selected_game && game._id !== this.selected_game._id)) {
      this.service.get_game(game._id).subscribe(
        (response: Game) => this.selected_game = response,
        (error: any) => console.log(error)
      );
    }
  }

  /*************************************************************/
  /*************************************************************/
  /*************************************************************/

  public goto_first_player() {
    this.layout.create_player = true;
    this.layout.zero_player = false;
  }

  /**
   * When a the user create a new player
   * Come from the Output of app-create-player
   * @param player {Player}
   */
  public new_player(player: Player) {
    this.team.players.push(player);
    this.selected_player = _.last(this.team.players);
    this.layout.create_player = false;
    this.layout.zero_player = false;
  }

  /**
   * When the user [cancel] the player creation
   * Show the players if the team have some
   * Else display the zero player UI
   */
  public create_player_cancel() {
    // If there are players
    if (this.team.players.length > 0) {
      this.layout.create_player = false;
    } else {
      // Else, display the zero player UI
      this.layout.zero_player = true;
    }
  }

  /**
   * When the user update the player
   * From the app-manage-player
   * Update the player, to update the list
   * @param player {Player}
   */
  public update_player(player: Player) {
    let player_index = _.findIndex(this.team.players, { _id: player._id });
    this.team.players[player_index] = player;
  }

  /************************** PLAYER ***************************/
  ionViewDidLoad() { };
}
