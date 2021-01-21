import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { LatinandstandardComponent } from './latinandstandard/latinandstandard.component';
import { UrbanComponent } from './urban/urban.component';

const routes: Routes = [
  {path: '', component: AdminComponent},
  {path: 'last', component: LatinandstandardComponent},
  {path: 'urban', component: UrbanComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
