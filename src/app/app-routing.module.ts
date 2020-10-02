import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudGenComponent } from './crud-gen/crud-gen.component';
import { PageBaseComponent } from './page-base/page-base.component';

const routes: Routes = [
  {
    path: 'cadastro/:screen',
    component: CrudGenComponent,
    data: {
      showNavigation: true
    }
  },
  {
    path: 'pagina/base',
    component: PageBaseComponent,
    data: {
      showNavigation: true
    }
  },

  { path: '**', redirectTo: '/pagina/base' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
