import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlassBackgroundComponent } from './../glass/glass-background/glass-background.component';
import { GlassSelectorComponent } from "../glass/glass-selector/glass-selector.component";
import { GlassNavbarComponent } from './../glass/glass-navbar/glass-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlassBackgroundComponent, GlassSelectorComponent, GlassNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'luvas.io-app';
}
