import { AlertController, NavController, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { Game } from '../../classes/game.class';
import { Team, TeamFull } from '../../classes/team.class';
import { Player } from '../../classes/player.class';
import { CreateTeamPage } from './create-team/create-team';
import { BackStatProvider } from "../../providers/back-stat.provider";
import { CreateGamePage } from "./create-game/create-game";
import _ from 'lodash';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})

export class DashboardPage {
  public teams: Array<Team | TeamFull>;
  public team: TeamFull;
  public pane: string;
  public selected_player: Player;
  public selected_team: Team; // The team selected in the UI <select/>
  private selected_game: Game;
  public layout: any = {
    zero_player: false,
    create_player: false,
    zero_game: false,
    create_game: false
  };

  constructor(private navController: NavController,
    private dashboardService: DashboardService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private bs: BackStatProvider) {
  }

  delete_team(_id) {
    /*this.notification('Supprimer cette équipe ?', 'Supprimer une équipe, supprime aussi ses joueurs, ses matchs et ses statistiques', 'Peu m\'importe', () => {
     this.dashboardService.delete_team(_id).subscribe(
     res => {
     for (let key in this.teams) {
     if (this.teams[key]._id === _id) {
     this.teams.splice(Number(key), 1);
     }
     }
     },
     err => console.log(err)
     );
     });*/
  }

  /**
   * Select the team which the user tap on it
   */
  set_team(team: Team) {
    this.dashboardService.get_team(team._id).subscribe(
      (team: TeamFull) => {
        this.team = team;

        if (this.team.players.length === 0) {
          this.layout.zero_player = true;
          this.pane = 'players';
        } else {
          this.selected_player = _.first(this.team.players);
          this.pane = 'players';
          this.layout.zero_game = (this.team.games.length === 0);
        }
      }
    );
  }

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

  /**
   * Nav to the StatPage
   * @param  {string} id [The game's id]
   */
  goto_stat(id: string): void {
    // this.navController.push(StatPage, {
    //   team_id: this.team._id,
    //   game_id: id
    // });
  }

  /************************************************************/
  /*************************** TEAM ***************************/
  /************************************************************/

  /**
   * GO TO -> Create a team
   */
  goto_create_team(): void {
    this.modalCtrl.create(CreateTeamPage).present();
  }

  /************************************************************/
  /*************************** GAME ***************************/
  /************************************************************/
  public create_first_game() {
    this.modalCtrl.create(CreateGamePage).present();
  }

  /*************************************************************/
  /************************** PLAYER ***************************/
  /*************************************************************/

  public create_first_player() {
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

  /************************************************************/

  ionViewDidLoad() {
    this.bs.get_teams().subscribe(
      (teams: Array<Team | TeamFull>) => {
        this.teams = teams;
        if (this.teams.length !== 0) {
          this.selected_team = _.last(this.teams);
          this.set_team(_.last(this.teams));
        }
      }
    );

    this.dashboardService.get_teams().subscribe(
      (teams: Team[]) => this.bs.set_teams(teams),
      err => console.error(err)
    );
  };
}
