import { Routes } from '@angular/router';

import { IndexComponent } from './../pages/index/index.component';
import { PortifolioComponent } from './../pages/portifolio/portifolio.component';

export const routes: Routes = [

    //Index page
    { path: '', component: IndexComponent },

    //Portifolio page
    { path: 'portifolio', component: PortifolioComponent }

];
