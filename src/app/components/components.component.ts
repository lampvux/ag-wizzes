import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  constructor(private auth: AuthService, private translate: TranslateService) {
    translate.setDefaultLang('en');
   }
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.switchLanguage(user.Language.toLowerCase());
      }
    });
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
      navbar.classList.add('nav-down');
    }
  }

}
