import { Component } from '@angular/core';

import { GlassBackgroundComponent } from './../../glass/glass-background/glass-background.component';
import { GlassSelectorComponent } from "../../glass/glass-selector/glass-selector.component";
import { GlassNavbarComponent } from './../../glass/glass-navbar/glass-navbar.component';
import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';

@Component({
  selector: 'portifolio-page',
  imports: [GlassBackgroundComponent, GlassSelectorComponent, GlassNavbarComponent, GlassLoadingCloseOnViewInitComponent],
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.scss'
})
export class PortifolioComponent {}
