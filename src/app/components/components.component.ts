import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

  constructor(ls: AuthService) {
     
   }

  ngOnInit() {
    const navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    if (navbar.classList.contains('nav-up')) {
      navbar.classList.remove('nav-up');
      navbar.classList.add('nav-down');
    }
  }

}
