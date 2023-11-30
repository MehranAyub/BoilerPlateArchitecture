import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyDataService {

  public refreshImagesGrid$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public uploader: FileUploader;
   
  constructor() { }
}
