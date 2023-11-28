import { Component, OnInit } from '@angular/core';
import { GetPropertyWithImageForViewDto, PropertiesServiceProxy, PropertyStatusDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-sale-properties',
  templateUrl: './sale-properties.component.html',
  styleUrls: ['./sale-properties.component.css']
})
export class SalePropertiesComponent implements OnInit {
  public items:GetPropertyWithImageForViewDto[]=[]
  constructor(private _propertiesServiceProxy:PropertiesServiceProxy) { }

  ngOnInit() {
    this._propertiesServiceProxy.getAllPropertiesWithImages('',PropertyStatusDto.IsForSale,false, 'id',0,20).subscribe((res)=>{
      this.items =res.items;
      this.items.forEach((x)=>{
        x.imageDto.imageBytes = 'data:image/png;base64,' + x.imageDto.imageBytes; 
    });
  });
  }
  setDefaultImage(event: any) {
    event.target.src = '/assets/client/images/property/fp1.jpg';
  }

}
