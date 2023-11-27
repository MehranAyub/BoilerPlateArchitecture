import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientComponent } from "./client/client.component";
import { HomeComponent } from "./pages/home/home.component";
import { PropertyDetailComponent } from "./pages/property-detail/property-detail.component";

const routes: Routes = [
    {
        path: "",
        component: ClientComponent,
        children: [
            { path: "", redirectTo: "home" },
            { path: "home", component: HomeComponent },
            { path: "property-detail", component: PropertyDetailComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
