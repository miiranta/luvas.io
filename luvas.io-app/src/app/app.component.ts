import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlassBackgroundComponent } from './../glass/glass-background/glass-background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlassBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'luvas.io-app';
}
