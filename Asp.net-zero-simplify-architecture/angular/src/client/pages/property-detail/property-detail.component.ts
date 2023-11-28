import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetPropertyForDetailOutput, PropertiesServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  public detail!:GetPropertyForDetailOutput;

  constructor(private route: ActivatedRoute,private _propertiesServiceProxy:PropertiesServiceProxy) { }

  ngOnInit() {
    let propertyId = this.route.snapshot.paramMap.get('id');
    this._propertiesServiceProxy.getPropertyForDetail(propertyId).subscribe((res)=>{
      this.detail =res;
      this.detail.propertyFiles.forEach((x)=>{
        x.imageBytes = 'data:image/png;base64,' + x.imageBytes; 
    });
  });
  }
  setDefaultImage(event: any) {
    event.target.src = 'assets/client/images/property/lsslider1.jpg';
  }

}
