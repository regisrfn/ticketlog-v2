import { Component, OnInit } from '@angular/core';
import { Estado } from '../shared/estado.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShowingItems = false
  estadoUF = "SC"
  selectedValue = "Selecione o Estado"

  options: Estado[] = [
    {
      nome: 'Rio Grande do Sul',
      uf: 'RS',
      urlImage: 'assets/svg/Bandeira_do_Rio_Grande_do_Sul.png',
      custoEstadoUs: 0,
      populacao: 0
    },
    {
      nome: 'Santa Catarina',
      uf: 'SC',
      urlImage: 'assets/svg/Bandeira_de_Santa_Catarina.svg',
      custoEstadoUs: 0,
      populacao: 0
    },
    {
      nome: 'Parana',
      uf: 'PR',
      urlImage: 'assets/svg/Bandeira_do_Paraná.svg',
      custoEstadoUs: 0,
      populacao: 0
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  showItems() {
    this.isShowingItems = !this.isShowingItems
  }

  trackByFn(index: any, item: Estado) {
    return item.uf;
  }

}
