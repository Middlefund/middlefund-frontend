import {Component, EventEmitter, Input, Output} from '@angular/core';
import {data} from "autoprefixer";

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {
  @Input() tableHeader: string[] = []
  @Input() tableData: any[] = []
  @Input() isLoading: boolean = false;
  @Input() noData: string = ''
  @Input() page: number = 1
  @Input() total: number = 0
  @Output() pageChange = new EventEmitter<number>();
  @Output() preview = new EventEmitter<string>()

  emitPageNumber(event: number) {
    this.pageChange.emit(event);
  }

  emitId(id: string) {
    this.preview.emit(id);
  }

}
