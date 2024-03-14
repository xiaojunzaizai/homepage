import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';


import { AppComponent } from './app.component';
import { AddSignInUserComponent } from './add-sign-in-user/add-sign-in-user.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoadingComponent } from './loading/loading.component';
import { AppRoutingModule } from './app-routing.module';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { SignInDetailComponent } from './sign-in-detail/sign-in-detail.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(en);
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false , delay: 500}
    ),
    NgbModule,
    NgZorroAntdModule,
    NzButtonModule,
    NzDatePickerModule,
    NzTimePickerModule,
    ReactiveFormsModule,
    RouterModule,
    IconsProviderModule,
    NzInputModule,
    NzLayoutModule,
    NzMenuModule,
    BrowserAnimationsModule
    
  ],
  declarations: [
    AddSignInUserComponent,
    AppComponent,
    TopBarComponent,
    BodyComponent,
    HomeComponent,
    LoadingComponent,
    SignInDetailComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppModule { }
