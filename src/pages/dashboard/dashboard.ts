import {AlertController, NavController, Platform, ModalController} from 'ionic-angular';
import {Component} from '@angular/core';
import {DashboardService} from './dashboard-service';
import {Game} from '../../classes/game.class';
import {Team, TeamFull} from '../../classes/team.class';
import {Player} from '../../classes/player.class';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {CreateTeamPage} from '../create-team/create-team';
import {BackStatProvider} from "../../providers/back-stat.provider";

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
    public player_creation_mode: boolean;

    constructor(private navController: NavController,
                private dashboardService: DashboardService,
                private alertCtrl: AlertController,
                private fb: FormBuilder,
                private modalCtrl: ModalController,
                private bs: BackStatProvider) {

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
            (team: TeamFull) => {
                this.team = team;

                if (this.team.players.length === 0) {
                    this.player_creation_mode = true;
                    this.pane = 'players';
                } else {
                    this.select_player(this.team.players[0]);
                    this.pane = 'players';
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
        this.modalCtrl.create(CreateTeamPage).present();
    }

    /****************************************************************************/
    /********************************** PLAYER **********************************/
    /****************************************************************************/

    /**
     * When a the user create a new player
     * Come from the Output of app-create-player
     * @param player {Player}
     */
    public new_player(player: Player) {
        this.team.players.push(player);
    }

    /**
     * When the user click on the list
     * Fille the form with its value
     * @param player {Player}
     */
    public select_player(player: Player) {
        console.log('select_player');
        this.player_form.patchValue({
            _id: player._id,
            lastname: player.lastname,
            firstname: player.firstname,
            number: player.number,
            birthdate: player.birthdate,
            license: player.license,
        })
    }

    ionViewDidLoad() {
        this.bs.get_teams().subscribe(
            (teams: Team[]) => {
                this.teams = teams;
                if (this.teams.length !== 0) {
                    this.set_team(this.teams[0]);
                }
            }
        );

        this.dashboardService.get_teams().subscribe(
            (teams: Team[]) => {
                this.teams = teams;
                this.bs.set_teams(teams);
                if (this.teams.length > 0) {
                    this.selected_team = this.teams[0];
                    this.set_team(this.teams[0]);
                }
            },
            err => console.error(err)
        );
    };
}
