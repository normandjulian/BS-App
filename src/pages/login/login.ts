import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, NavParams, ModalController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

import {Storage} from '@ionic/storage';
import {DashboardPage} from '../dashboard/dashboard';
import {BackStatProvider} from '../../providers/back-stat.provider';
import {LoginService} from "./login-service";
import {RegisterPage} from "../register/register";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [LoginService]
})

export class LoginPage implements OnInit {
    public user: Guest;
    public isLogged: Boolean = false;
    public login_form: any = null;
    public toStore: boolean = false;

    constructor(private navCtrl: NavController,
                private storage: Storage,
                private alertCtrl: AlertController,
                private fb: FormBuilder,
                private modalCtrl: ModalController,
                private navParams: NavParams,
                private service: LoginService,
                private bs: BackStatProvider) {
    }

    /**
     * Display a notification to the layout
     * @param  {string} message [The message to display]
     */
    notification(message: string): void {
        this.alertCtrl.create({
            title: 'Information',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }

    /**
     * Login to the application
     * @param  {Guest}  guest [The pair login/password]
     */
    sign_in(guest: Guest): void {
        this.service.sign_in(guest).subscribe(
            (token: Token) => {
                if (token['error']) {
                    this.notification(token['message']);
                } else {
                    this.storage.set('credits', JSON.stringify(token));
                    this.bs.set_token(token.token);
                    this.navCtrl.setRoot(DashboardPage);
                }
            },
            err => console.log(err)
        );
    }

    /**
     * Redirect to the page Register
     */
    goto_registerPage(): void {
        this.modalCtrl.create(RegisterPage).present();
    }

    save_credits() {
        // TODO
    }

    lf_credits_storage() {
        this.storage.get('credits').then(res => {
            if (res) {
                let user = JSON.parse(res);
                this.sign_in({
                    'email': user.email,
                    'password': user.password
                });
            }
        });
    }

    /**
     * Initialisation of the page
     */
    ngOnInit() {
        this.login_form = this.fb.group({
            email: ['', [<any>Validators.required]],
            password: ['', [<any>Validators.required]]
        });

        // Check the storage for auto signin
        // this.lf_credits_storage();

        // Get the email from the RegisterPage
        if (typeof this.navParams.get('email') !== 'undefined') {
            this.login_form.setValue({
                email: this.navParams.get('email')
            });
        }

        this.sign_in({
            email: 'normandjulian@gmail.com',
            password: 'juju'
        });
    }
}

class Token {
    email: string;
    token: string;
    _id: string;
}

class Guest {
    email: string;
    password: string;
}
