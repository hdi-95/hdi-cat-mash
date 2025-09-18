import { Component, Input } from '@angular/core';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'hdi-cats-grid',
  imports: [],
  templateUrl: './cats-grid.html',
  styleUrl: './cats-grid.scss',
})
export class CatsGrid {
  @Input() cats: Cat[] = [];
}
