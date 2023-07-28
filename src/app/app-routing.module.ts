import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GltransactionsComponent } from './components/gltransactions/gltransactions.component';
import { GlaccountsComponent } from './components/glaccounts/glaccounts.component';
import { NewadminsComponent } from './components/newadmins/newadmins.component';

const routes: Routes = [
  { path: 'login', component: AdminloginComponent },
  { path: 'dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]},
  { path: 'gltransactions', component: GltransactionsComponent, canActivate: [AuthGuard]},
  { path: 'glaccounts', component: GlaccountsComponent, canActivate: [AuthGuard]},
  { path: 'newadmins', component: NewadminsComponent, canActivate: [AuthGuard]},
  // { path: 'newadmins', component: NewadminsComponent, canActivate: [AuthGuard].},


];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  AdminloginComponent,
  AdmindashboardComponent,
  GltransactionsComponent,
  GlaccountsComponent,
  NewadminsComponent
]