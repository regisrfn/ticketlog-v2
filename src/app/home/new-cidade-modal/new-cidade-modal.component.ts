import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Estado } from 'src/app/shared/estado.model';

@Component({
  selector: 'app-new-cidade-modal',
  templateUrl: './new-cidade-modal.component.html',
  styleUrls: ['./new-cidade-modal.component.scss']
})
export class NewCidadeModalComponent implements OnInit {
  @Input() data: Estado | undefined;
  @Input() isOpen = false
  @Output() closed: EventEmitter<{ isClosed: boolean }> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.isOpen = false
    this.closed.emit({ isClosed: true })
  }

}
