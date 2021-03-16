import { Component, Input, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cidade } from '../shared/cidade.model';
import { CidadeService } from '../shared/cidade.service';
import { Dolar } from '../shared/dolar.model';
import { DolarService } from '../shared/dolar.service';
import { Notification } from '../shared/notification.model';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})
export class CidadesComponent implements OnInit, OnDestroy {
  @Input() uf = "";
  dolarNow = new Dolar
  cidadesPage = new Page();
  cidadesList: Cidade[] = [];
  open = false
  selectedCidades: Cidade[] = []
  editMode = false;
  askDeleteGroup = false
  isDeleting = false

  ascendingPopulacao = true
  ascendingNome = true
  ascending = true;
  orderBy = "nome"

  deleteSubscription: Subscription | undefined
  saveSubscription: Subscription | undefined


  constructor(private cidadeService: CidadeService, private dolarService: DolarService) { }

  ngOnInit(): void {
    this.subscribeNotifications();
    this.setDolar()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uf) {
      this.reset()
      this.setCidadePage(this.uf, 0)
    }
  }

  ngOnDestroy() {
    this.saveSubscription?.unsubscribe()
    this.deleteSubscription?.unsubscribe()
  }

  nextPage() {
    this.selectedCidades = []
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, this.cidadesPage.pageNumber + 1);
  }

  previousPage() {
    this.selectedCidades = []
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, this.cidadesPage.pageNumber - 1);
  }

  goToPage(pageNo: number) {
    this.selectedCidades = []
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, pageNo);
  }

  trackByFn(index: any, item: Cidade) {
    return item.id;
  }

  selectCidade(cidade: Cidade) {
    cidade.isChecked = true
    this.open = true;
    this.selectedCidades.push(cidade)
  }

  selectCidades() {
    this.selectedCidades = this.cidadesList.filter(cidade => cidade.isChecked)
  }

  deleteCidade(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.isDeleting = true
      this.cidadeService.deleteCidadesList(this.selectedCidades)
        .then(res => {
          this.setDeleteEvenMessage(true, 'Cidade removida', 'successfully')
          this.isDeleting = false
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Cidade não pode ser removida', 'error')
          this.isDeleting = false
        })
    }
    else {
      this.isDeleting = false
      this.open = false;
      this.unselectCidades()
      this.selectedCidades = []
    }
  }

  deleteCidadeList(event: { isConfirmed: boolean }) {
    this.setDeleteEvenMessage();
    if (event.isConfirmed) {
      this.isDeleting = true
      this.cidadeService.deleteCidadesList(this.selectedCidades)
        .then(res => {
          this.setDeleteEvenMessage(true, 'Lista de cidades removida', 'successfully')
          this.isDeleting = false
        })
        .catch(err => {
          this.setDeleteEvenMessage(true, 'Lista não removida', 'error')
          this.isDeleting = false
        })
    }
    else {
      this.isDeleting = false
      this.askDeleteGroup = false;
    }
  }

  dolar2Real(cidade: Cidade) {
    if (cidade.custoCidadeUs && this.dolarNow?.USD) {
      return cidade.custoCidadeUs * (this.dolarNow.USD.ask || 1)
    }
    return 0
  }

  setPageOrderBY(orderBy: string) {
    if (orderBy === 'populacao') {
      this.orderBy = orderBy
      this.ascendingNome = true
      this.ascendingPopulacao = !this.ascendingPopulacao
      this.ascending = this.ascendingPopulacao
    }
    else if (orderBy === 'nome') {
      this.orderBy = orderBy
      this.ascendingPopulacao = true
      this.ascendingNome = !this.ascendingNome
      this.ascending = this.ascendingNome
    }
    this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, this.cidadesPage.pageNumber)
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  private setDolar() {
    this.dolarService.getDolar()
      .then(res => {
        this.dolarNow = res as Dolar
      })
      .catch(err => console.log(err))
  }


  private setDeleteEvenMessage(show = false, msg = '', type = '') {
    this.cidadeService.deletedCidade.emit({
      show: show,
      msg: msg,
      type: type,
    });
  }

  private subscribeNotifications() {
    this.saveSubscription = this.cidadeService.savedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully")
        this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, this.cidadesPage.pageNumber)
    });
    this.deleteSubscription = this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.open = false;
        this.askDeleteGroup = false
        this.editMode = false
        this.verifyPageAfterDelete()
        this.setCidadePageOrderBy(this.uf, this.orderBy, this.ascending, this.cidadesPage.pageNumber)
      }
    });
  }
  private verifyPageAfterDelete() {
    if (this.cidadesPage.pageNumber > 0) {
      this.cidadesPage.pageNumber = this.selectedCidades.length === this.cidadesList.length ? this.cidadesPage.pageNumber - 1 : this.cidadesPage.pageNumber
    }
  }

  private reset() {
    this.selectedCidades = []
    this.editMode = false;
    this.askDeleteGroup = false
    this.ascendingPopulacao = true
    this.ascendingNome = true
    this.orderBy = "nome"
  }

  private setCidadePage(uf: string, pageNumber: number) {
    this.cidadeService.getPagePorEstado(uf, pageNumber)
      .then((page) => {
        this.cidadesPage = page as Page;
        this.cidadesList = this.cidadesPage.cidadesList;
      })
      .catch(err => {
        console.log(err);
      });
  }

  private setCidadePageOrderBy(uf: string, orderBy: string, ascending: boolean, pageNumber: number) {
    this.cidadeService.getPagePorEstadoOrderBy(uf, orderBy, ascending, pageNumber)
      .then((page) => {
        this.cidadesPage = page as Page;
        this.cidadesList = this.cidadesPage.cidadesList;
      })
      .catch(err => {
        console.log(err);
      });
  }

  private unselectCidades() {
    this.selectedCidades.forEach(cidade => cidade.isChecked = false)
  }

}
