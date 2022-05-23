import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './user-page.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import { AuthGuard } from 'src/app/authentication/auth.guard';
import { MatButtonModule } from '@angular/material/button';


const routes: Routes = [
  { path: '', component: UserPageComponent, canActivate:[AuthGuard]  }
];

@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    ScrollingModule,
    MatButtonModule
  ]
})
export class UserPageModule { }
