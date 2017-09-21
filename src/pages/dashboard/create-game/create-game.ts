import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from '../dashboard-service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Game } from "../../../classes/game.class";

@Component({
  selector: 'app-create-game',
  templateUrl: 'create-game.html',
  providers: [DashboardService]
})

export class CreateGamePage implements OnInit {
  @Input() team;
  @Output() game: EventEmitter<Game> = new EventEmitter<Game>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  private game_form: FormGroup;
  public menu_create: boolean;

  constructor(private service: DashboardService, private fb: FormBuilder) {

    this.game_form = this.fb.group({
      opponent: ['', [<any>Validators.required]],
      date: ['', [<any>Validators.required]],
      time: ['', [<any>Validators.required]],
      period: this.fb.group({
        type: [4, [<any>Validators.required]],
        time: [10, [<any>Validators.required]]
      }),
      home: [true, []]
    });
  }

  /*public create_game(game: Game) {
    game.team_id = this.team._id;
    this.service.create_game(game).subscribe(
      (response: game) => this.game.emit(response)
    );
  }*/

  public cancel_create_game() {
    this.cancel.emit(true);
  }

  ngOnInit() {
    // this.menu_create = (this.team.players.length !== 0);
  };
}
