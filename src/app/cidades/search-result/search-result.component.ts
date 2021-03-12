import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cidade } from 'src/app/shared/cidade.model';
import { CidadeService } from 'src/app/shared/cidade.service';
import { Dolar } from 'src/app/shared/dolar.model';
import { DolarService } from 'src/app/shared/dolar.service';
import { Notification } from 'src/app/shared/notification.model';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit, OnDestroy {

  foundListOfCidades: Cidade[] = []
  cidadeNameToSearch: string | undefined
  query: string | undefined
  param: string | undefined

  selectedCidade: Cidade | undefined
  selectedCidades: Cidade[] = []
  editMode = false;
  askDeleteGroup = false
  isDeleting = false
  isSearching = false
  open = false
  dolarNow = new Dolar

  deleteSubscription: Subscription | undefined

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.param = this.route.snapshot.params["uf"]
      this.cidadeNameToSearch = params.nome
      this.searchCidade(this.param, this.cidadeNameToSearch)
    })
    this.subscribeNotifications()
  }
  ngOnDestroy() {
    this.deleteSubscription?.unsubscribe()
  }

  searchCidade(uf: string | undefined, nome: string | undefined) {
    if (nome && uf) {
      this.isSearching = true
      this.cidadeService.getCidadesListByNameAndUf(uf, nome)
        .then(res => {
          this.foundListOfCidades = res as Cidade[]
          this.isSearching = false
        })
        .catch(err => {
          this.isSearching = false
          console.log(err)
        })
    }
  }

  trackByFn(index: any, item: Cidade) {
    return item.id;
  }

  selectCidade(cidade: Cidade) {
    cidade.isChecked = true
    this.open = true;
    this.selectedCidade = cidade
    this.selectedCidades.push(cidade)
  }

  selectCidades() {
    this.selectedCidades = this.foundListOfCidades.filter(cidade => cidade.isChecked)
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
      this.selectedCidade!.isChecked = false
      this.selectedCidade = undefined
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

  constructor(private route: ActivatedRoute,
    private cidadeService: CidadeService,
    private dolarService: DolarService) {
    this.setDolar();
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
    this.deleteSubscription = this.cidadeService.deletedCidade.subscribe((notification: Notification) => {
      if (notification.type === "successfully") {
        this.open = false;
        this.askDeleteGroup = false
        this.editMode = false
        this.foundListOfCidades = this.foundListOfCidades.filter(cidade => !cidade.isChecked)
      }
    });
  }

}
