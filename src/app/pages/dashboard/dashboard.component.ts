import { Component, OnInit } from '@angular/core';
import { Storage } from '@app/@core';
import { UserService } from '@app/@core/services';

@Component({
  selector: 'dashboard',
  template: '<router-outlet></router-outlet>'
})
export class DashboardComponent implements OnInit {

  isGettingMe = false;

  constructor(private userService: UserService) {
  }

  doIdentity() {
    if (localStorage['auth_app_token']) {
      if (!Storage.exists('user') && !this.isGettingMe) {
        this.isGettingMe = true;
        this.getDataUser();
      }
    }
  }

  getDataUser() {
    this.userService.me().subscribe(data => {
      Storage.set('user', data);
      this.isGettingMe = false;
    }, error => {
      this.isGettingMe = false;
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.doIdentity();
  }
}
