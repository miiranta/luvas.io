import { inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlassRedirectService {
  
  private router: Router = inject(Router);

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  getURL(): string {
    //return this.router.url;
    return window.location.href; // Faster than router.url
  }

  getRoute(): string {
    return this.router.url;
  }
}
