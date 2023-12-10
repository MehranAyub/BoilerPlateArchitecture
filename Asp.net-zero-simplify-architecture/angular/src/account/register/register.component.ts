import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, ListResultDtoOfRoleListDto, PasswordComplexitySetting, ProfileServiceProxy, RegisterOutput, RoleListDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { LoginService } from '../login/login.service';
import { RegisterModel } from './register.model';
import { finalize, catchError } from 'rxjs/operators';
import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
    templateUrl: './register.component.html',
    animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase implements OnInit {
    @ViewChild('recaptchaRef', {static: true}) recaptchaRef: RecaptchaComponent;

    model: RegisterModel = new RegisterModel();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    recaptchaSiteKey: string = AppConsts.recaptchaSiteKey;
    roleListDto:RoleListDto[]=[];
    saving = false;
    referralId:string=''
    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy,
        private _roleServiceProxy:RoleServiceProxy,
        private _activatedRoute:ActivatedRoute
    ) {
        super(injector);
    }

    ngOnInit() {
        //Prevent to register new users in the host context
        // if (this.appSession.tenant == null) {
        //     this._router.navigate(['account/login']);
        //     return;
        // }

        this._profileService.getPasswordComplexitySetting().subscribe(result => {
            this.passwordComplexitySetting = result.setting;
        });
        this._accountService.getDefaultRoles().subscribe((res)=>{
            this.roleListDto=res.items;
        });
        this.model.roleId=0;

        this.referralId= this._activatedRoute.snapshot.queryParams['referrId']; 
    }

    get useCaptcha(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    }

    onInputChange(event:any){ 
        this.model.surname=this.model.name;
        this.model.userName=this.model.emailAddress;
    }
    save(): void {
        // if (this.useCaptcha && !this.model.captchaResponse) {
        //     this.message.warn(this.l('CaptchaCanNotBeEmpty'));
        //     return;
        // }
        if(!(this.model.roleId>0)){
            this.message.warn("Please select role");
            return;
        }
        if(this.referralId.length>0){
            let splitId=this.referralId.split('-')[0];
            this.model.referId=splitId;
        }
        this.saving = true;
        this._accountService.register(this.model)
            .pipe(finalize(() => { this.saving = false; }))
            .pipe(catchError((err, caught): any => {
                this.recaptchaRef.reset();
            }))
            .subscribe((result: RegisterOutput) => {
                if (!result.canLogin) {
                    this.notify.success(this.l('SuccessfullyRegistered'));
                    this._router.navigate(['account/login']);
                    return;
                }

                //Autheticate
                this.saving = true;
                this._loginService.authenticateModel.userNameOrEmailAddress = this.model.userName;
                this._loginService.authenticateModel.password = this.model.password;
                this._loginService.authenticate(() => { this.saving = false; });
            });
    }

    captchaResolved(captchaResponse: string): void {
        this.model.captchaResponse = captchaResponse;
    }
}
