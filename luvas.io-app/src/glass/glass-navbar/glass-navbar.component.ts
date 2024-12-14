import { Component, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';

import anime from 'animejs';

interface NavBarConfig {
  title_start: string[];
  title_end: string[];
  links: {
    title: string;
    link: string;
    padding: string;
  }[][];
}

@Component({
  selector: 'glass-navbar',
  imports: [],
  templateUrl: './glass-navbar.component.html',
  styleUrl: './glass-navbar.component.scss'
})
export class GlassNavbarComponent {
  router: Router = inject(Router);
  private eventService: GlassDoceventsService = inject(GlassDoceventsService);

  URL: string;

  @ViewChild('glassNavbar') glassNavbar!: any;

  @Input() config: NavBarConfig = {
    title_start: ['title1', 'title2'],
    title_end: ['title3', 'title4'],
    links: [
      [
        {title: 'Link1', link: '/link1', padding: '0 0 0 0'},
      ],
      [
        {title: 'Link2', link: '/link2', padding: '0 0 0 0'},
        {title: 'Link3', link: '/link3', padding: '0 0 0 0'},
        {title: 'Link4', link: '/link4', padding: '0 0 0 0'},
      ]
    ]
  };

  route_parts: string[] = [];

  nav_open: boolean = false;
  nav_animating: boolean = false;

  constructor() {
    this.URL = window.location.href;
    this.URL = this.URL.split('://')[1];
    this.URL = this.URL.split('/')[0];
  }

  ngOnInit() {
    this.renderRoutes();

    this.eventService.addCallbackToScroll((event: any) => {
      return this.closeNavOnScroll(event);
    });
  }

  renderRoutes() {
    const route = this.router.url;

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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  toggleNav(nav: HTMLElement) {
    
    if(this.nav_animating) return;
    if(!this.nav_open) {
      this.nav_animating = true;

      // Transform 180 glass-navbar-title-end
      anime({
        targets: '.glass-navbar-title-end',
        rotate: 270,
        duration: 10,
        easing: 'easeInOutQuad'
      });

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

      // Transform 180 glass-navbar-title-end
      anime({
        targets: '.glass-navbar-title-end',
        rotate: 90,
        duration: 10,
        easing: 'easeInOutQuad'
      });

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