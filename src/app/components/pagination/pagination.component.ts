import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input()
  public totalPhotos: number;

  @Input()
  public firstDisplayed: number;

  @Input()
  public lastDisplayed: number;

  @Input()
  public nextDisabled: boolean;

  @Input()
  public previousDisabled: boolean;

  @Output('next')
  public next: EventEmitter<void> = new EventEmitter();

  @Output('previous')
  public previous: EventEmitter<void> = new EventEmitter();
}
