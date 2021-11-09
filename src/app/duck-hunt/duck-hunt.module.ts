import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DuckHuntComponent} from './duck-hunt.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DuckHuntComponent
  }
];

@NgModule({
  declarations: [
    DuckHuntComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    DuckHuntComponent
  ]
})
export class DuckHuntModule {
}
