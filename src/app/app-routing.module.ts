import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminloginComponent } from './components/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GltransactionsComponent } from './components/gltransactions/gltransactions.component';
import { GlaccountsComponent } from './components/glaccounts/glaccounts.component';
import { NewadminsComponent } from './components/newadmins/newadmins.component';
import { AdminusersComponent } from './components/adminusers/adminusers.component';
import { UnlockuserComponent } from './components/unlockuser/unlockuser.component';
import { AdminChangePasswordComponent } from './components/admin-change-password/admin-change-password.component';
import { KycverificationComponent } from './components/kycverification/kycverification.component';
import { KycexpandedviewComponent } from './components/kycexpandedview/kycexpandedview.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ImagedialogComponent } from './components/imagedialog/imagedialog.component';

const routes: Routes = [
  { path: 'login', component: AdminloginComponent },
  { path: 'dashboard', component: AdmindashboardComponent, canActivate: [AuthGuard]},
  { path: 'gltransactions', component: GltransactionsComponent, canActivate: [AuthGuard]},
  { path: 'glaccounts', component: GlaccountsComponent, canActivate: [AuthGuard]},
  { path: 'newadmins', component: NewadminsComponent, canActivate: [AuthGuard]},
  { path: 'adminusers', component: AdminusersComponent, canActivate: [AuthGuard]},
  { path: 'unlockuser', component: UnlockuserComponent, canActivate: [AuthGuard]},
  { path: 'adminchangepassword', component: AdminChangePasswordComponent},
  { path: 'kycverification', component: KycverificationComponent, canActivate: [AuthGuard]},
  { path: 'kycexpandedview', component: KycexpandedviewComponent, canActivate: [AuthGuard]},
  { path: 'chatbox', component: ChatboxComponent, canActivate: [AuthGuard]},
  { path: 'imagecontainer', component: ImagedialogComponent, canActivate: [AuthGuard]},
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
  NewadminsComponent,
  AdminusersComponent,
  AdminChangePasswordComponent,
  KycverificationComponent,
  KycexpandedviewComponent,
  ChatboxComponent,
  ImagedialogComponent
]