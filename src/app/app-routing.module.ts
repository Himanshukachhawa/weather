import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import{RouterModule,Routes} from '@angular/router';

const appRoutes: Routes =[
  {path: '',redirectTo:'lg',pathMatch:'full'},
  {path:'lg',component:LoginComponent},
  {path:'home',component:HomeComponent}

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
