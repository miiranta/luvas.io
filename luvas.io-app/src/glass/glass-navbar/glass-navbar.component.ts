import { Component, inject, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';
import { GlassRedirectService } from '../services/glass-redirect/glass-redirect.service';

import { SimplebarAngularModule, SimplebarAngularComponent } from 'simplebar-angular';

import anime from 'animejs';

interface NavBarConfig {
  title_start: string[];
  title_end: string[];
  links: {
    title: string;
    link: string;
    classes?: string[];
  }[][];
}

@Component({
  selector: 'glass-navbar',
  imports: [SimplebarAngularModule],
  templateUrl: './glass-navbar.component.html',
  styleUrl: './glass-navbar.component.scss'
})
export class GlassNavbarComponent {
  
  private router: Router = inject(Router);
  private eventService: GlassDoceventsService = inject(GlassDoceventsService);
  redirectService: GlassRedirectService = inject(GlassRedirectService);

  URL: string;

  @ViewChild('glassNavbar') glassNavbar!: any;
  @ViewChild('navSb') navSb!: SimplebarAngularComponent;

  @Input() config: NavBarConfig = {
    title_start: ['title1', 'title2'],
    title_end: ['title3', 'title4'],
    links: [
      [
        {title: 'Link1', link: '/link1', classes: []},
      ],
      [
        {title: 'Link2', link: '/link2', classes: []},
        {title: 'Link3', link: '/link3', classes: []},
        {title: 'Link4', link: '/link4', classes: []},	
      ]
    ]
  };

  navSbOptions = { autoHide: false, scrollbarMinSize: 100 };

  route_parts: string[] = [];

  nav_open: boolean = false;
  nav_animating: boolean = false;

  constructor() {
    this.URL = this.redirectService.getURL();
    this.URL = this.URL.split('://')[1];
    this.URL = this.URL.split('/')[0];
  }

  ngOnInit() {
    this.eventService.addCallbackToScroll((event: any) => {
      return this.closeNavOnAction(event);
    });
    this.eventService.addCallbackToMouseClick((event: any) => {
      return this.closeNavOnAction(event);
    });

    this.router.events.subscribe((event) => {
      this.renderRoutes();
    });
  }

  renderRoutes() {
    const route = this.redirectService.getURL();

    // Break the route into parts
    this.route_parts = route.split('/');

    // Remove 3 first parts
    this.route_parts = this.route_parts.slice(3);
    
    // Remove fist part if ''
    if(this.route_parts[0] == '') this.route_parts.shift();

    // Add / to each part
    this.route_parts = this.route_parts.map((part) => {
      return '/' + part;
    });
  }

  navigateToPart(route_idx: number) {
    
    if(route_idx == -1) {
      this.redirectService.navigateTo('/');
    }

    else {
      let route = '';
      for(let i = 0; i <= route_idx; i++) {
        route += this.route_parts[i];
      }
      this.redirectService.navigateTo(route);
    }

  }

  navigateToAndClose(route: string) {
    this.redirectService.navigateTo(route);
    this.toggleNav(this.glassNavbar.nativeElement);
  }

  toggleNav(nav: HTMLElement) {
    
    if(this.nav_animating) return;
    if(!this.nav_open) {
      this.nav_animating = true;

      // Update Simplebar
      this.navSb.SimpleBar.recalculate();

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

  closeNavOnAction(event: any) {

    if(this.nav_open && this.glassNavbar != undefined) {

      // Is event inside glass-navbar?
      const mousePos = this.eventService.getMousePosition();
      const nav_info = this.glassNavbar.nativeElement.querySelector('.glass-navbar-info');

      if(this.eventService.isInViewport(nav_info, mousePos.x, mousePos.y)) return;
      
      this.toggleNav(this.glassNavbar.nativeElement);
    }
  }

}
