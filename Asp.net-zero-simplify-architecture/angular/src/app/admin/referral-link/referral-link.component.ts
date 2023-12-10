import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { MessageService } from '@abp/message/message.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-referral-link",
    templateUrl: "./referral-link.component.html",
    styleUrls: ["./referral-link.component.scss"],
})
export class ReferralLinkComponent extends AppComponentBase implements OnInit {
    referralUrl: string = "";

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.referralUrl =
            this.appRootUrl() +
            "account/register?referrId=" +
            this.appSession.user.id +
            "-" +
            this.appSession.user.name;
    }

    copyTextToClipboard() {
        navigator.clipboard
            .writeText(this.referralUrl)
            .then(() => { 
                this.notify.info('Link Coppied');
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    }
}
