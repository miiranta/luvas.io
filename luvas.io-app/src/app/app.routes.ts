import { Routes } from '@angular/router';

import { IndexComponent } from './../pages/index/index.component';
import { PortfolioComponent } from './../pages/portfolio/portfolio.component';
import { ResumeComponent } from './../pages/resume/resume.component';
import { LuvasioProjPageComponent } from './../pages/projects/luvasio-proj-page/luvasio-proj-page.component';
import { CecompcombrProjPageComponent } from '../pages/projects/cecompcombr-proj-page/cecompcombr-proj-page.component';

export const routes: Routes = [

    //Index page
    { path: '', component: IndexComponent },

    //Resume page
    { path: 'resume', component: ResumeComponent },

    //Portfolio page
    { path: 'portfolio', component: PortfolioComponent },

    //Project page : Luvas.io
    { path: 'portfolio/luvasio', component: LuvasioProjPageComponent },

    //Project page : Cecomp.com.br
    { path: 'portfolio/cecompcombr', component: CecompcombrProjPageComponent }

];
