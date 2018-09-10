import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Output('next')
  public next: EventEmitter<void> = new EventEmitter();

  @Output('previous')
  public previous: EventEmitter<void> = new EventEmitter();
}
