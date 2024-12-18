import { Component } from '@angular/core';

import { GlassSelectorComponent } from "../../glass/glass-selector/glass-selector.component";
import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';

@Component({
  selector: 'portifolio-page',
  imports: [GlassSelectorComponent, GlassLoadingCloseOnViewInitComponent],
  templateUrl: './portifolio.component.html',
  styleUrl: './portifolio.component.scss'
})
export class PortifolioComponent {}
