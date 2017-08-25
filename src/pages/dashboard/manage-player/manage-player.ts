import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {DashboardService} from '../dashboard-service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Player} from "../../../classes/player.class";

@Component({
    selector: 'app-manage-player',
    templateUrl: 'manage-player.html',
    providers: [DashboardService]
})

export class ManagePlayerComponent implements OnInit, OnChanges{
    @Input() player;
    @Output() updated_player: EventEmitter<Player> = new EventEmitter<Player>();
    private player_form: FormGroup;

    constructor(private service: DashboardService, private fb: FormBuilder) {

        this.player_form = this.fb.group({
            _id: ['', [<any>Validators.required]],
            number: ['', [<any>Validators.required]],
            firstname: ['', [<any>Validators.required]],
            lastname: ['', [<any>Validators.required]],
            birthdate: ['', []],
            license: ['', []]
        });
    }

    public update_player(player: Player) {
        this.service.update_player(player).subscribe(
            (response: Player) => this.updated_player.emit(response)
        );
    }

    ngOnInit() {
        // this.menu_create = (this.team.players.length !== 0);
    };

    ngOnChanges(changes: SimpleChanges) {
        if (changes.hasOwnProperty('player')) {
            
            this.player_form.patchValue({
                _id: changes.player.currentValue._id,
                number: changes.player.currentValue.number,
                firstname: changes.player.currentValue.firstname,
                lastname: changes.player.currentValue.lastname,
                birthdate: changes.player.currentValue.birthdate,
                license: changes.player.currentValue.license
            });

        }
    }
}