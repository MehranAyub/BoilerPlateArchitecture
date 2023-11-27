import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as ngCommon from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client/client.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { ClientFooterComponent } from './components/client-footer/client-footer.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { SalePropertiesComponent } from './components/sale-properties/sale-properties.component';
import { RentPropertiesComponent } from './components/rent-properties/rent-properties.component';
import { FeaturedPropertiesComponent } from './components/featured-properties/featured-properties.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';


@NgModule({
  declarations: [ClientComponent, HomeComponent, ClientHeaderComponent, ClientFooterComponent, OurTeamComponent, SalePropertiesComponent, RentPropertiesComponent, FeaturedPropertiesComponent, PropertyDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule, 
    ClientRoutingModule
  ]
})
export class ClientModule { }
