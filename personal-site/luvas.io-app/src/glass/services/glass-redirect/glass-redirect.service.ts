import { inject, Injectable } from '@angular/core';

import { Route, Router } from '@angular/router';

import { GlassLoadingService } from './../glass-loading/glass-loading.service';
import { GlassRedirectComponent } from './../../glass-redirect/glass-redirect.component';

@Injectable({
  providedIn: 'root'
})
export class GlassRedirectService {
  
  private router: Router = inject(Router);
  private loadingService: GlassLoadingService = inject(GlassLoadingService);

  constructor() {

    // Add redirect/mailto to router, if it doesn't exist
    if(!this.router.config.find((r) => r.path === 'redirect/:url')) {

      let r1: Route = {
        path: 'redirect/:url',
        component: GlassRedirectComponent
      };
      this.router.config.unshift(r1);

      let r2: Route = {
        path: 'mailto/:url',
        component: GlassRedirectComponent
      };
      this.router.config.unshift(r2);

      let r3: Route = {
        path: 'download/:url',
        component: GlassRedirectComponent
      };
      this.router.config.unshift(r3);

      this.router.resetConfig(this.router.config);
    }

  }

  navigateTo(url: string): void {
    
    // Is it self redirect?
    if (this.getRoute() === url) {
      return;
    }

    this.loadingService.showLoadingScreen();

    setTimeout(() => {

      // External URL
      if(url.includes('http') || url.includes('https')) {

        const url_encoded = encodeURIComponent(url);

        window.open("redirect/" + url_encoded, '_blank');

        this.loadingService.hideLoadingScreen();
        return;
      }

      // Internal URL
      this.router.navigate([url])
      .catch((error) => {this.loadingService.hideLoadingScreen();});

    }, 150);
  }

  emailTo(email: string): void {
    window.open("mailto/" + `mailto:${email}`, '_blank');
  }

  download(url: string): void {
    const url_encoded = encodeURIComponent(url);
    window.open("download/" + url_encoded, '_blank');
  }

  getURL(): string {
    //return this.router.url;
    return window.location.href; // Faster than router.url
  }

  getRoute(): string {
    return this.router.url;
  }

}
