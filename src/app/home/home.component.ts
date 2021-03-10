import { Component, OnInit } from '@angular/core';
import { Estado } from '../shared/estado.model';
import { EstadoService } from '../shared/estado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShowingItems = false
  estadoUF: string | undefined = "SC"
  urlImage: string | undefined
  selectedValue: string | undefined = "Selecione o Estado"
  selectedEstado: Estado | undefined
  loadingEstado = false

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

  ngOnInit(): void {
    this.selectEstado(this.estadoUF)
  }

  showItems() {
    this.isShowingItems = !this.isShowingItems
  }

  selectEstado(uf: string | undefined) {
    this.loadingEstado = true
    let newEstadoSelected = undefined
    newEstadoSelected = this.findEstadoByUF(uf)

    if (newEstadoSelected && uf) {
      this.isShowingItems = false
      this.estadoUF = newEstadoSelected.uf
      this.urlImage = newEstadoSelected.urlImage
      this.selectedValue = newEstadoSelected.nome
      this.setSelectedEstado(uf)
    }else {
      this.loadingEstado = this.loadingEstado = false
    }

  }

  trackByFn(index: any, item: Estado) {
    return item.uf;
  }

  constructor(
    private estadoService: EstadoService
  ) { }

  private setSelectedEstado(uf: string) {
    this.estadoService.getEstadoById(uf)
      .then(res => {
        this.selectedEstado = res as Estado
        this.selectedEstado.urlImage = this.urlImage
      })
  }

  private findEstadoByUF(uf: string | undefined): Estado | undefined {
    if (undefined)
      return undefined
    return this.options.filter(estado => estado.uf === uf)[0]
  }



}
