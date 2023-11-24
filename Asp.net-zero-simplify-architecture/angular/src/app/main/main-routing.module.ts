import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyFilesesComponent } from './entities/propertyFileses/propertyFileses.component';
import { PropertiesComponent } from './entities/properties/properties.component';
import { CreateOrEditPropertyComponent } from './entities/properties/create-or-edit-property.component';
import { ViewPropertyComponent } from './entities/properties/view-property.component'; 
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'entities/propertyFileses', component: PropertyFilesesComponent, data: { permission: 'Pages.PropertyFileses' }  },
                    { path: 'entities/properties', component: PropertiesComponent, data: { permission: 'Pages.Properties' }  },
                    { path: 'entities/properties/createOrEdit', component: CreateOrEditPropertyComponent, data: { permission: 'Pages.Properties.Create' }  },
                    { path: 'entities/properties/view', component: ViewPropertyComponent, data: { permission: 'Pages.Properties' }  },
                    // { path: 'accountGroup/glacgrp', component: GLACGRPComponent, data: { permission: 'Pages.GLACGRP' }  },
                    // { path: 'glCostCenter/glCstCent', component: GLCstCentComponent, data: { permission: 'Pages.GLCstCent' }  },
                    // { path: 'books/glbooks', component: GLBOOKSComponent, data: { permission: 'Pages.GLBOOKS' }  },
                    // { path: 'sourceCode/glsrce', component: GLSRCEComponent, data: { permission: 'Pages.GLSRCE' }  },
                    { path: 'dashboard', component: DashboardComponent, data: { permission: 'Pages.Tenant.Dashboard' } }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
