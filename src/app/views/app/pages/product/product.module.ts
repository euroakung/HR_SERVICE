import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThumbListComponent } from './thumb-list/thumb-list.component';
import { ImageListComponent } from './image-list/image-list.component';
import { DetailsComponent } from './details/details.component';
import { DataListComponent } from './data-list/data-list.component';
import { ProductRoutingModule } from './product.routing';
import { ProductComponent } from './product.component';
import { DetailsAltComponent } from './details-alt/details-alt.component';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { PagesContainersModule } from 'src/app/containers/pages/pages.containers.module';
import { HotkeyModule } from 'angular2-hotkeys';
import { ComponentsCardsModule } from 'src/app/components/cards/components.cards.module';
import { ComponentsChartModule } from 'src/app/components/charts/components.charts.module';
import { RatingModule, PaginationModule, TabsModule, ModalModule, BsDropdownModule, AccordionModule } from 'ngx-bootstrap';
import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { ContextMenuModule } from 'ngx-contextmenu';

@NgModule({
  declarations: [DataListComponent, DetailsComponent, ImageListComponent, ThumbListComponent, ProductComponent, DetailsAltComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
    ComponentsCarouselModule,
    LayoutContainersModule,
    PagesContainersModule,
    ComponentsCardsModule,
    ComponentsChartModule,
    RatingModule,
    FormsModuleAngular,
    ReactiveFormsModule,
    HotkeyModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ContextMenuModule.forRoot({
      useBootstrap4: true,
    })
  ]
})
export class ProductModule { }
