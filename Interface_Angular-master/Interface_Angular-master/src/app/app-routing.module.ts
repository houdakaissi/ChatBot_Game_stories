import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeloComponent } from './homelo/homelo.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SidebarComponent },
  { path: 'home/logged', component: HomeloComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
