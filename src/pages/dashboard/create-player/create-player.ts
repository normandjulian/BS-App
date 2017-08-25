import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../dashboard-service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Player} from "../../../classes/player.class";

@Component({
    selector: 'app-create-player',
    templateUrl: 'create-player.html',
    providers: [DashboardService]
})

export class CreatePlayerComponent implements OnInit{
    @Input() team;
    @Output() player: EventEmitter<Player> = new EventEmitter<Player>();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
    private player_form: FormGroup;
    public menu_create: boolean;

    constructor(private service: DashboardService, private fb: FormBuilder) {

        this.player_form = this.fb.group({
            number: ['', [<any>Validators.required]],
            firstname: ['', [<any>Validators.required]],
            lastname: ['', [<any>Validators.required]],
            birthdate: ['', []],
            license: ['', []]
        });
    }

    public create_player(player: Player) {
        player.team_id = this.team._id;
        this.service.create_player(player).subscribe(
            (response: Player) => this.player.emit(response)
        );
    }

    public cancel_create_player() {
        this.cancel.emit(true);
    }

    ngOnInit() {
        // this.menu_create = (this.team.players.length !== 0);
    };
}
