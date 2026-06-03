import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerthPlannerComponent } from './berth-planner.component';

const routes: Routes = [
  {
    path: '',
    component: BerthPlannerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BerthplannerRouting {}
