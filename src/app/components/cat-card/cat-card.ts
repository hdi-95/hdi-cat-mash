import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'hdi-cat-card',
  imports: [TranslateModule],
  templateUrl: './cat-card.html',
  styleUrl: './cat-card.scss',
})
export class CatCard {
  @Input() cat!: Cat;
  @Output() vote = new EventEmitter<string>();
}
