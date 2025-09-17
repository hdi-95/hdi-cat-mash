import { Routes } from '@angular/router';
import { VoteComponent } from './pages/vote/vote';
import { ScoresComponent } from './pages/scores/scores';

export const routes: Routes = [
  { path: '', redirectTo: 'vote', pathMatch: 'full' },
  { path: 'vote', component: VoteComponent },
  { path: 'scores', component: ScoresComponent },
  { path: '**', redirectTo: 'vote' },
];
