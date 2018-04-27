import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, Directive } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { ReportCreateComponent } from './report-create/report-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';


import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


import { MapService } from "./map.service";
import { GeocodingService } from "./geocoding.service";
import { SidebarpanelComponent } from './userpage/sidebarpanel/sidebarpanel.component';
import { UserdashComponent } from './userpage/userdash/userdash.component';
import { AdmindashComponent } from './userpage/admindash/admindash.component';
import { RegisterComponent } from './userpage/register/register.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './userpage/login/login.component';
import { MysubscriptionsComponent } from './userpage/mysubscriptions/mysubscriptions.component';
import { MysubmissionsComponent } from './userpage/mysubmissions/mysubmissions.component';
import { CatCreateComponent } from './userpage/cat-create/cat-create.component';



const appRoutes: Routes = [
  {
    path: 'report',
    component: FrontpageComponent,
    data: { title: 'Book List' }
  },
  { path: '',
    redirectTo: '/report',
    pathMatch: 'full'
  },
  {
    path: 'report-details/:id',
    component: ReportDetailComponent
  },
  {
    path: 'user',
    component: UserpageComponent,
    children: [
      {
      path: '',
      component: UserdashComponent,
      
      },
      {
        path: 'admin',
        component: AdmindashComponent,
        
      },
      {
        path: 'report-create',
        component: ReportCreateComponent, 
        // canActivate: [AuthGuardService]
        
      },
      {
        path: 'subscriptions',
        component: MysubscriptionsComponent, 
        // canActivate: [AuthGuardService]
        
      },
      {
        path: 'submissions',
        component: MysubmissionsComponent, 
        // canActivate: [AuthGuardService]
        
      },
      {
        path: 'report-details/:id',
        component: ReportDetailComponent
      }

    ]
  },
  {
    path: 'register',
    component: RegisterComponent

  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'cat-create',
    component: CatCreateComponent

  },
  { 
    path: '**', component: PagenotfoundComponent 
  }

];

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    PagenotfoundComponent,
    ReportDetailComponent,
    ReportCreateComponent,
    NavbarComponent,
    FooterComponent,
    MapComponent,
    FrontpageComponent,
    UserpageComponent,
    SidebarpanelComponent,
    UserdashComponent,
    AdmindashComponent,
    RegisterComponent,
    LoginComponent,
    MysubscriptionsComponent,
    MysubmissionsComponent,
    CatCreateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    LeafletModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FormsModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(
      {
        progressBar: true
      }
    ), // ToastrModule added
  ],
  providers: [
    MapService,
    GeocodingService,
    AuthenticationService, 
    AuthGuardService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
