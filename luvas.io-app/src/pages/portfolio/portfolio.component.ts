import { Component } from '@angular/core';

import { GlassSelectorComponent } from "../../glass/glass-selector/glass-selector.component";
import { GlassLoadingCloseOnViewInitComponent } from '../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';

@Component({
  selector: 'portfolio-page',
  imports: [GlassSelectorComponent, GlassLoadingCloseOnViewInitComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {}
