import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../shared/cidade.service';
import { Dolar } from '../shared/dolar.model';
import { DolarService } from '../shared/dolar.service';
import { Estado } from '../shared/estado.model';
import { EstadoService } from '../shared/estado.service';
import { Notification } from '../shared/notification.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isShowingItems = false
  estadoUF: string = "SC"
  urlImage: string | undefined
  selectedValue: string | undefined = "Selecione o Estado"
  selectedEstado: Estado | undefined
  loadingEstado = false
  dolar: Dolar | undefined

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
    this.getDolar()
    this.selectEstado(this.route.snapshot.params['uf'])
  }

  showItems() {
    this.isShowingItems = !this.isShowingItems
  }

  selectEstado(uf: string | undefined) {
    this.loadingEstado = true
    let newEstadoSelected = undefined
    newEstadoSelected = this.findEstadoByUF(uf || this.estadoUF)

    if (newEstadoSelected) {
      this.isShowingItems = false
      this.estadoUF = newEstadoSelected.uf || this.estadoUF
      this.urlImage = newEstadoSelected.urlImage
      this.selectedValue = newEstadoSelected.nome
      this.setSelectedEstado(this.estadoUF)
      this.router.navigate([`${this.estadoUF.toLowerCase()}`])
    } else {
      this.loadingEstado = this.loadingEstado = false
    }

  }

  dolar2Real() {
    if (this.selectedEstado && this.dolar?.USD) {
      return this.selectedEstado.custoEstadoUs * (this.dolar.USD.ask || 1)
    }
    return 0
  }

  trackByFn(index: any, item: Estado) {
    return item.uf;
  }

  constructor(
    private estadoService: EstadoService,
    private dolarService: DolarService,
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  private setSelectedEstado(uf: string) {
    this.estadoService.getEstadoById(uf)
      .then(res => {
        this.selectedEstado = res as Estado
        this.selectedEstado.urlImage = this.urlImage
        console.log(this.selectedEstado);

      })
  }

  private findEstadoByUF(uf: string | undefined): Estado | undefined {
    if (undefined)
      return undefined
    return this.options.filter(estado => estado.uf!.toLocaleLowerCase() === uf!.toLocaleLowerCase())[0]
  }

  private getDolar() {
    this.dolarService.getDolar()
      .then(res => {
        this.dolar = res as Dolar
      })
      .catch(err => console.log(err))
  }

  private subscribeNotifications() {
    this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.setSelectedEstado(this.estadoUF);
      }
    });
    this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully")
        this.setSelectedEstado(this.estadoUF);

    });
  }

}
