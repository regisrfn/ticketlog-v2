import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShowingItems = false
  defaultEstadoUF = "SC"

  options = [
    {
      nome: 'Rio Grande do Sul',
      uf: 'RS',
      url: 'assets/svg/Bandeira_do_Rio_Grande_do_Sul.png',
    },
    {
      nome: 'Santa Catarina',
      uf: 'SC',
      url: 'assets/svg/Bandeira_de_Santa_Catarina.svg',
    },
    {
      nome: 'Parana',
      uf: 'PR',
      url: 'assets/svg/Bandeira_do_Paraná.svg',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  showItems() {
    this.isShowingItems = !this.isShowingItems
  }

}
