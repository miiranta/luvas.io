import { Routes } from '@angular/router';

import { IndexComponent } from './../pages/index/index.component';
import { PortifolioComponent } from './../pages/portifolio/portifolio.component';
import { ResumeComponent } from './../pages/resume/resume.component';
import { LuvasioProjPageComponent } from './../pages/projects/luvasio-proj-page/luvasio-proj-page.component';

export const routes: Routes = [

    //Index page
    { path: '', component: IndexComponent },

    //Resume page
    { path: 'resume', component: ResumeComponent },

    //Portifolio page
    { path: 'portifolio', component: PortifolioComponent },

    //Project page : Luvas.io
    { path: 'portifolio/luvasio', component: LuvasioProjPageComponent }


];
