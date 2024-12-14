import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlassLoadingComponent } from '../glass/glass-loading/glass-loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlassLoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'luvas.io-app';
}
