import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { hrComponent } from './hr.component';
import { hrRoutingModule } from './hr.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';

@NgModule({
  declarations: [hrComponent, StartComponent],
  imports: [
    SharedModule,
    LayoutContainersModule,
    hrRoutingModule
  ]
})
export class hrModule { }
