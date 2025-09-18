import { Component, Input } from '@angular/core';
import { Cat } from '../../models/cat.model';

@Component({
  selector: 'hdi-cats-podium',
  imports: [],
  templateUrl: './cats-podium.html',
  styleUrl: './cats-podium.scss',
})
export class CatsPodium {
  @Input() podium: Cat[] = [];
}
