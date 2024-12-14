import { Component } from '@angular/core';

import { GlassBackgroundComponent } from './../../glass/glass-background/glass-background.component';
import { GlassNavbarComponent } from './../../glass/glass-navbar/glass-navbar.component';

@Component({
  selector: 'index-page',
  imports: [GlassBackgroundComponent, GlassNavbarComponent],	
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

}
