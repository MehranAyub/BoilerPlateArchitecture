import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { HomeComponent } from "./pages/home/home.component";
import { PropertyDetailComponent } from "./pages/property-detail/property-detail.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";

const routes: Routes = [
    {
        path: "",
        component: ClientComponent,
        children: [
            { path: "", redirectTo: "home" },
            { path: "home", component: HomeComponent },
            { path: "detail/:id", component: PropertyDetailComponent },
            { path: "contact-us", component: ContactUsComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
