import { data } from 'jquery';
import {UserService} from '../service/user.services';

class UserController implements ng.IController {
    static $inject = ['userService', '$state'];
    users: any;
    constructor(public user: UserService, public $state: ng.ui.IStateService) {
        this.user.getAll().then((data) => {
            console.log('data.data: ', data.data)
            this.users = data.data
        });
    }
}

export class UserComponent implements ng.IComponentOptions {
    static NAME: string = 'userView';
    controller: any;
    templateUrl: any;
    constructor() {
        this.controller = UserController,
        this.templateUrl = require('./user.html')
    }
}