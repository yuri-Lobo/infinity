import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";

import { UIModule } from "../../shared/ui/ui.module";

import { DashboardsRoutingModule } from "./dashboards-routing.module";

import { DefaultDashboardComponent } from "./default/default.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";

@NgModule({
  declarations: [DefaultDashboardComponent, Dashboard2Component],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    UIModule,
    NgbTooltipModule,
    DashboardsRoutingModule,
    NgApexchartsModule,
  ],
})
export class DashboardsModule {}
