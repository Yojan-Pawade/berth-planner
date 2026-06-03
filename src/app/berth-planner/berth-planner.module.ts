import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BerthPlannerComponent } from './berth-planner.component';
import { BerthplannerRouting } from './berth-planner-routing.module';
import {BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';

@NgModule({
  declarations: [BerthPlannerComponent],
  imports: [CommonModule, BerthplannerRouting],
  providers:  [BerthPlannerbaseService , TimeLineService]
})
export class BerthPlannerModule {}
