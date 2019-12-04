import { Component, OnInit } from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { DataMisc } from '@app/@core/misc';

@Component({
  selector: 'ngx-app', template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private themeService: NbThemeService,
              private toastrService: NbToastrService) {
    if (localStorage['themeName']) this.themeService.changeTheme(localStorage['themeName']);
  }

  ngOnInit(): void {
    DataMisc.toolkit().toast = this.toastrService;
  }
}
