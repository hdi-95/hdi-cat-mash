import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'hdi-loader',
  imports: [TranslateModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {}
