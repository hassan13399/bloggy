import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'st-modal',
  templateUrl: './st-modal.component.html'
})
export class StModalComponent implements OnInit {
  @Input('title') title = 'Title modal';
  @Input('modalRef') modalRef;
  @Input('cancelLabel') cancelLabel: string = 'Cancel';
  @Input('actionLabel') actionLabel: string = 'Action';
  @Output() onActionClick: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

  crossClick(): void {
    this.modalRef.dismiss('crossClick');
  }

  actionClick(): void {
    this.onActionClick.emit('actionClick');
  }

  cancelClick(): void {
    this.modalRef.close('cancelClick');
  }
}