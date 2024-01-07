import { Routes } from '@angular/router';
import { DiaryComponent } from './Components/diary/diary.component';
import { DiaryFormComponent } from './Components/diary-form/diary-form.component';

export const routes: Routes = [
  { path: 'data-entry', component: DiaryFormComponent },
  { path: '', component: DiaryComponent },
  { path: 'edit/:id', component: DiaryFormComponent },
];
