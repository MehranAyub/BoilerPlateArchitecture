import { Component, OnInit } from "@angular/core";
import { ScriptLoaderService } from "@shared/utils/script-loader.service";

@Component({
    selector: "app-client",
    templateUrl: "./client.component.html",
    styleUrls: ["./client.component.css"],
})
export class ClientComponent implements OnInit {
    assetsLoad: boolean = false;

    scripts: string[] = [
        "/assets/client/js/jquery-3.3.1.js",
        "/assets/client/js/jquery-migrate-3.0.0.min.js",
        "/assets/client/js/popper.min.js",
        "/assets/client/js/bootstrap.min.js",
        "/assets/client/js/jquery.mmenu.all.js",
        "/assets/client/js/ace-responsive-menu.js",
        "/assets/client/js/bootstrap-select.min.js",
        "/assets/client/js/isotop.js",
        "/assets/client/js/snackbar.min.js",
        "/assets/client/js/simplebar.js",
        "/assets/client/js/parallax.js",
        "/assets/client/js/scrollto.js",
        "/assets/client/js/jquery-scrolltofixed-min.js",
        "/assets/client/js/jquery.counterup.js",
        "/assets/client/js/wow.min.js",
        "/assets/client/js/slider.js",
        "/assets/client/js/pricing-slider.js",
        "/assets/client/js/script.js",
    ];
    constructor(private scriptLoader: ScriptLoaderService) {
        this.assetsLoad = true;
        this.scriptLoader
            .load(...this.scripts)
            .then((res) => {
                this.assetsLoad = false;
            })
            .catch((error) => console.error("Error loading script", error));
    }

    ngOnInit() {}
}
