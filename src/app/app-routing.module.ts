import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertPersonComponent } from './insert-person/insert-person.component';

const routes: Routes = [
  {
    path: 'inserir',
    component: InsertPersonComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
