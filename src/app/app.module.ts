import { SignUpService } from './pages/signup/signup.service';
import { AppConfig } from './app.config';
import { APP_CONFIG } from 'app/app.config';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { CustomizerComponent } from './customizer/customizer.component';
import { SidenavModule } from './sidenav/sidenav.module';
import { HeaderModule } from './header/header.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    CustomizerComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    SharedModule,
    HeaderModule,
    SidenavModule,
    AppRoutingModule,
   //CoreModule,
    ReactiveFormsModule,
    AuthenticationModule,
  ],
  providers: [{ provide: APP_CONFIG, useValue: AppConfig },
              SignUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
