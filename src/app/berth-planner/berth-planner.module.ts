import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BerthPlannerComponent } from './berth-planner.component';
import { BerthplannerRouting } from './berth-planner-routing.module';
import {BerthPlannerbaseService } from './services/berth-planner-base.service';
import { TimeLineService } from './services/timeline.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule }   from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule }   from '@angular/material/menu';
import { FormsModule }     from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BerthPlannerComponent],
  imports: [CommonModule, BerthplannerRouting, MatButtonModule, MatIconModule, MatButtonToggleModule, MatMenuModule, MatSlideToggleModule, FormsModule,MatDialogModule],
  providers: [BerthPlannerbaseService, TimeLineService]
})
export class BerthPlannerModule {}
