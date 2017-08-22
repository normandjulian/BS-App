import { AlertController, NavController, Platform, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DashboardService } from './dashboard-service';
import { Game } from '../../../../BackStat-App/src/classes/game.class';
// import { StatPage } from '../../../../BackStat-App/src/pages/stat/stat';
import { Team, TeamFull } from '../../../../BackStat-App/src/classes/team.class';
import { Player } from '../../../../BackStat-App/src/classes/player.class';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {TeamPage} from "../team/team";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})

export class DashboardPage {
  private teams: Team[];
  private team: TeamFull;
  private player_form: FormGroup;
  private pane: string;
  private selected_team: Team;
  private selected_game: Game;

  constructor(
    private navController: NavController,
    private dashboardService: DashboardService,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private platform: Platform) {

    this.player_form = this.fb.group({
      _id: ['', []],
      number: ['', [<any>Validators.required]],
      firstname: ['', [<any>Validators.required]],
      lastname: ['', [<any>Validators.required]],
      birthdate: ['', []],
      license: ['', []]
    });
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
      res => {
        this.team = res;
        this.select_player(this.team.players[0]);
        this.pane = 'games';
      }
    );
  }

  /**
   * Store the game selected by the user
   * @param  {Game}   _game [description]
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
          handler: () => { }
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

  /**
   *
   * @param player
   */
  select_player(player: Player) {
    if (player) { // Mode Update
      this.player_form.patchValue({
        _id: player._id,
        number: player.number,
        firstname: player.firstname,
        lastname: player.lastname
      });
    } else { // Mode Creation
      this.player_form.setValue({
        _id: null,
        number: null,
        firstname: null,
        lastname: null,
        birthdate: null,
        license: null
      });
    }
  }

  save_player(player: Player) {
    console.log('save_player');
    if (this.player_form.value._id) { // Update
      console.log('mode update');
    } else {
      console.log('mode creation');
    }
    // this.dashboardService.
  }

  /**
   * Redirect to the page Team
   */
  create_team(): void {
    this.modalCtrl.create(TeamPage).present();
  }

  ionViewDidLoad() {
    this.dashboardService.get_teams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
        if (this.teams.length > 0) {
          this.selected_team = this.teams[0];
          this.set_team(this.teams[0]);
        }
        this.create_team();
      },
      err => console.error(err)
    );
  };
}
