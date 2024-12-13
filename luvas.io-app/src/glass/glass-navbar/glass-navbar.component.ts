import { Component, inject, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';

import anime from 'animejs';

@Component({
  selector: 'glass-navbar',
  imports: [],
  templateUrl: './glass-navbar.component.html',
  styleUrl: './glass-navbar.component.scss'
})
export class GlassNavbarComponent {
  router: Router = inject(Router);
  private eventService: GlassDoceventsService = inject(GlassDoceventsService);

  @ViewChild('glassNavbar') glassNavbar!: any;

  route_parts: string[] = [];

  nav_open: boolean = false;
  nav_animating: boolean = false;

  ngOnInit() {
    this.renderRoutes();

    this.eventService.addCallbackToScroll((event: any) => {
      return this.closeNavOnScroll(event);
    });
  }

  renderRoutes() {
    const route = "/portifolio/luvas-io";

    // Break the route into parts
    this.route_parts = route.split('/');

    // Remove the first empty string
    this.route_parts.shift();

    // Add / to each part
    this.route_parts = this.route_parts.map((part) => {
      return '/' + part;
    });

  }

  navigateToPart(route_idx: number) {
    
    if(route_idx == -1) {
      this.router.navigate(['/']);
    }

    else {
      let route = '';
      for(let i = 0; i <= route_idx; i++) {
        route += this.route_parts[i];
      }
      this.router.navigate([route]);
    }


  }

  toggleNav(nav: HTMLElement) {
    
    if(this.nav_animating) return;
    if(!this.nav_open) {
      this.nav_animating = true;

      // Translate down
      anime({
        targets: nav,
        translateY: 60,
        duration: 300,
        easing: 'easeInOutQuad',
        complete: () => {
          this.nav_open = true;
          this.nav_animating = false;
        }
      });

    }else{
      this.nav_animating = true;

      console.log('closing nav');

      // Translate up
      anime({
        targets: nav,
        translateY: 0,
        duration: 300,
        easing: 'easeInOutQuad',
        complete: () => {
          this.nav_open = false;
          this.nav_animating = false;
        }
      });

    }
    
  }

  closeNavOnScroll(event: any) {
    if(this.nav_open && this.glassNavbar != undefined) {
      this.toggleNav(this.glassNavbar.nativeElement);
    }
  }


}
