import {Component, OnInit} from '@angular/core';
import {ViewController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';

import {RegisterService} from './register-service';
import {Club} from '../../classes/club.class';
import {RegisterUser} from '../../classes/user.class';
import {HttpErrorResponse} from "@angular/common/http";

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
     * @param  {RegisterUser} value   The form
     * @param  {boolean} isValid Is the form valid
     */
    register(value: RegisterUser, isValid: boolean): void {
        if (RegisterPage.validate_password(value.password, value.confirm_pwd)) {
            this.registerService.sign_up(value).subscribe(
                res => {
                    if (res['message']) {
                    } else {
                        this.viewCtrl.dismiss();
                    }
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,
                        this.notification('Error', `Message : ${err.error.code} <br/> Message : ${err.error.errmsg}`);
                        console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                }
            );
        } else {
            this.notification('Information', 'Vos mots de passes ne correspondent pas');
        }
    }

    /**
     * Return a boolean if both password are equals
     * @param  {string}  p1 first password
     * @param  {string}  p2 confirm password
     * @return {boolean}    is both are equals
     */
    static validate_password(p1: string, p2: string): boolean {
        return p1 === p2;
    }

    /**
     * Display a notification is case of error or information
     * @param {string} title - The title of the notification
     * @param {string} message The message to display
     */
    public notification(title: string, message: string): void {
        this.alertCtrl.create({
            title: title,
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
