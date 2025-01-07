import { Routes } from '@angular/router';

import { IndexComponent } from './../pages/index/index.component';
import { PortfolioComponent } from './../pages/portfolio/portfolio.component';
import { ResumeComponent } from './../pages/resume/resume.component';
import { LuvasioProjPageComponent } from './../pages/projects/luvasio-proj-page/luvasio-proj-page.component';
import { CecompcombrProjPageComponent } from '../pages/projects/cecompcombr-proj-page/cecompcombr-proj-page.component';
import { Code404Component } from '../pages/code404/code404.component';
import { StartProjPageComponent } from '../pages/projects/start-proj-page/start-proj-page.component';
import { Minecraft2ProjPageComponent } from '../pages/projects/minecraft2-proj-page/minecraft2-proj-page.component';

export const routes: Routes = [

    //Index page
    { path: '', component: IndexComponent },

    //Resume page
    { path: 'resume', component: ResumeComponent },

    //Portfolio page
    { path: 'portfolio', component: PortfolioComponent },

    //Project page : luvas.io
    { path: 'portfolio/luvasio', component: LuvasioProjPageComponent },

    //Project page : cecomp.com.br
    { path: 'portfolio/cecompcombr', component: CecompcombrProjPageComponent },

    //Project page : start
    { path: 'portfolio/start', component: StartProjPageComponent },

    //Project page : minecraft2
    { path: 'portfolio/minecraft2', component: Minecraft2ProjPageComponent },

    //Page not found
    { path: '**', component: Code404Component }

];
