import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cat } from '../../models/cat.model';
import { CatCard } from '../cat-card/cat-card';

@Component({
  selector: 'hdi-cats-vs',
  imports: [CatCard],
  templateUrl: './cats-vs.html',
  styleUrl: './cats-vs.scss',
})
export class CatsVs {
  @Input() cats: Cat[] = [];
  @Output() newPair = new EventEmitter<void>();

  vote(catId: string) {
    console.log('Vote clicked for cat', catId);
    this.newPair.emit();
  }
}
