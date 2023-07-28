import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
//import { FilterPipeModule } from 'ngx-filter-pipe';
import { OrderPipe } from 'ngx-order-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { GlaccountsComponent } from './components/glaccounts/glaccounts.component';
import { GltransactionsComponent } from './components/gltransactions/gltransactions.component';
import { HeaderComponent } from './components/header/header.component';
import { NewadminsComponent } from './components/newadmins/newadmins.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SearchPipe } from './search.pipe';
import { Routes, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';


const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  //{path: '', component: DashboardComponent},
  {path: 'dashboard', component: AdmindashboardComponent},
  {path: 'gltransactions', component: GltransactionsComponent},
  {path: 'glaccounts', component: GlaccountsComponent},
  {path: 'newadmins', component: NewadminsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    GlaccountsComponent,
    GltransactionsComponent,
    HeaderComponent,
    NewadminsComponent,
    SidenavComponent,
    SearchPipe
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [
    DatePipe,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
