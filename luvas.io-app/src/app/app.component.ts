import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlassLoadingComponent } from '../glass/glass-loading/glass-loading.component';
import { GlassBackgroundComponent } from '../glass/glass-background/glass-background.component';
import { GlassNavbarComponent } from '../glass/glass-navbar/glass-navbar.component';

import { SimplebarAngularModule, SimplebarAngularComponent } from 'simplebar-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlassLoadingComponent, GlassBackgroundComponent, GlassNavbarComponent, SimplebarAngularModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'luvas.io-app';

  sbOptions = { autoHide: false, scrollbarMinSize: 100 };

}
