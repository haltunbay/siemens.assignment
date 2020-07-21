import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor() { }

  items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink: '/'
      },
      {
        label: 'Customer List',
        routerLink: '/customer'
      },
      {
        label: 'Customer Form',
        routerLink: '/customer-form'
      }
    ];
  }

}
