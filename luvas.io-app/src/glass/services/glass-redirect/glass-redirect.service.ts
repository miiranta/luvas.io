import { inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';

import { GlassLoadingService } from './../glass-loading/glass-loading.service';
import { set } from 'animejs';

@Injectable({
  providedIn: 'root'
})
export class GlassRedirectService {
  
  private router: Router = inject(Router);
  private loadingService: GlassLoadingService = inject(GlassLoadingService);

  navigateTo(url: string): void {

    // Is it self redirect?
    if (this.getRoute() === url) {
      return;
    }

    this.loadingService.showLoadingScreen();

    setTimeout(() => {

      // External URL
      if(url.includes('http') || url.includes('https')) {
        // Open new tab
        window.open(url, '_blank');
        this.loadingService.hideLoadingScreen();
        return;
      }
      
      this.router.navigate([url])
      .catch((error) => {this.loadingService.hideLoadingScreen();});

    }, 150);
  }

  emailTo(email: string): void {
    window.open(`mailto:${email}`);
  }

  getURL(): string {
    //return this.router.url;
    return window.location.href; // Faster than router.url
  }

  getRoute(): string {
    return this.router.url;
  }
}
