import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FreBaseComponentsModule  } from 'fre-base-components';
import { NgxMaskModule } from 'ngx-mask';
import { CrudGenComponent } from './crud-gen/crud-gen.component';
import { FreRequestService } from './services/fre-request.service';
import { CrudSourceService } from './services/crud-source.service';
import { PageBaseComponent } from './page-base/page-base.component';

@NgModule({
  declarations: [
    AppComponent,
    CrudGenComponent,
    PageBaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FreBaseComponentsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    // Ngx
    NgxMaskModule.forRoot()
  ],
  providers: [
    FreRequestService,
    CrudSourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
