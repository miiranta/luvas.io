import { Component, inject } from '@angular/core';
import { GlassRedirectService } from '../../glass/services/glass-redirect/glass-redirect.service';

@Component({
  selector: 'code404',
  imports: [],
  templateUrl: './code404.component.html',
  styleUrl: './code404.component.scss'
})
export class Code404Component {

  private redirectService:GlassRedirectService = inject(GlassRedirectService);

  navigateTo(url: string) {
    this.redirectService.navigateTo(url);
  }

}
