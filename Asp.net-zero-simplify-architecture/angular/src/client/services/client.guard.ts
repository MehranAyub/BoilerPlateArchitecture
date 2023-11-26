import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AppSessionService } from '@shared/common/session/app-session.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements  CanActivate {

  constructor( 
      private _router: Router,
      private _sessionService: AppSessionService
  ) { }

  canActivateInternal(data: any, state: RouterStateSnapshot): boolean {
      

      if (!this._sessionService.user) {
        console.log("sessionService",this._sessionService.user);
          return true;
      }else{
        this._router.navigate(['/app']);
        console.log("sessionServiceElse",this._sessionService.user);
        return false;
      }
       
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivateInternal(route.data, state);
  }

 
}
