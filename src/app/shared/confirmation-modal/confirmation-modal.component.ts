import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent {
  @Input({}) visible: boolean = false;
  @Input() header: string = '';
  @Input() description: string = '';
  @Input() isLoading: boolean = false;
  @Output() cancel = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();

  cancelEmitter() {
    this.cancel.emit();
  }

  submitEmitter() {
    this.submit.emit();
  }
}
