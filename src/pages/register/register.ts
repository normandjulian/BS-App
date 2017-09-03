import {Component, OnInit} from '@angular/core';
import {ViewController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {RegisterService} from './register-service';
import {Club} from '../../classes/club.class';
import {RegisterUser} from '../../classes/user.class';

@Component({
  selector: 'register-page',
  templateUrl: 'register.html',
  providers: [RegisterService]
})
export class RegisterPage implements OnInit {
  public clubs: Club[] = [];
  public register_form: FormGroup;

  constructor(public viewCtrl: ViewController,
              public registerService: RegisterService,
              private fb: FormBuilder,
              public alertCtrl: AlertController) {

    // Define the form
    this.register_form = fb.group({
      email: ['', [<any>Validators.required]],
      lastname: ['', []],
      firstname: ['', []],
      password: ['', [<any>Validators.required]],
      confirm_pwd: ['', [<any>Validators.required]],
      club_id: ['', [<any>Validators.required]]
    });
  };

  /**
   * Let the user register to our application
   * @param  {NewUser} value   The form
   * @param  {boolean} isValid Is the form valid
   */
  register(value: RegisterUser, isValid: boolean): void {
    if (this.validate_password(value.password, value.confirm_pwd)) {
      this.registerService.sign_up(value).subscribe(
        res => {
          if (res['message']) {
          } else {
            this.viewCtrl.dismiss();
          }
        },
        error => console.error(error),
      );
    } else {
      this.notification('Vos mots de passes ne correspondent pas');
    }
  }

  /**
   * Return a boolean if both password are equals
   * @param  {string}  p1 first password
   * @param  {string}  p2 confirm password
   * @return {boolean}    is both are equals
   */
  validate_password(p1: string, p2: string): boolean {
    return p1 === p2;
  }

  /**
   * Display a notification is case of error or information
   * @param {string} message The message to display
   */
  notification(message: string): void {
    this.alertCtrl.create({
      title: 'Information',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  ngOnInit() {
    this.registerService.get_clubs().subscribe(
      res => this.clubs = res,
      error => console.log(error)
    );
  }
}
