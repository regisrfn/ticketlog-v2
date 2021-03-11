import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ptBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DeleteWarningComponent } from './delete-warning/delete-warning.component';
import { CidadesComponent } from './cidades/cidades.component';
import { NotificationComponent } from './notification/notification.component';
import { FormatCidadeNamePipe } from './pipes/format-cidade-name.pipe';
import { LoaderComponent } from './loader/loader.component';
import { NewCidadeModalComponent } from './home/new-cidade-modal/new-cidade-modal.component';
import { NewCidadeComponent } from './cidades/new-cidade/new-cidade.component';
import { NewCidadeFromFileComponent } from './cidades/new-cidade-from-file/new-cidade-from-file.component';
import { NewCidadeModalFileComponent } from './home/new-cidade-modal-file/new-cidade-modal-file.component';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DeleteWarningComponent,
    CidadesComponent,
    NotificationComponent,
    FormatCidadeNamePipe,
    LoaderComponent,
    NewCidadeModalComponent,
    NewCidadeComponent,
    NewCidadeFromFileComponent,
    NewCidadeModalFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InlineSVGModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
