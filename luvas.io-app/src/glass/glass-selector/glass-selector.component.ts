import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimplebarAngularModule } from 'simplebar-angular';
import anime from 'animejs';

interface GlassSelectorItems {
  title: string;
  description: string;
  img_src: string;
  link: string;
}

interface GlassSelectorConfig {
  title: string;
  width?: string;
  height?: string;
}

@Component({
  selector: 'glass-selector',
  imports: [SimplebarAngularModule, CommonModule],
  templateUrl: './glass-selector.component.html',
  styleUrl: './glass-selector.component.scss'
})
export class GlassSelectorComponent {

  @Input() items: GlassSelectorItems[] = [];
  @Input() config: GlassSelectorConfig = { title: 'Title', width: '100%', height: '100%' };

  simpleBarOptions = { 
    autoHide: true, 
    scrollbarMinSize: 100 
  };

  async animateFadeIn(element: HTMLElement){
    
    anime({
      targets: element,
      opacity: [0, 1],
      duration: 300,
      easing: 'easeInOutQuad'
    });

    // Element has SVG?
    const svg_present = element.querySelector('svg');
    if(svg_present) return;

    // Get the path
    const path = element.getBoundingClientRect();
    
    // current element scale
    const element_scale = element.getBoundingClientRect().width / element.offsetWidth;
    const svg_width = path.width / element_scale;
    const svg_height = path.height / element_scale;

    // Create an SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', svg_width + 'px');
    svg.setAttribute('height', svg_height + 'px');
    svg.setAttribute('viewBox', `0 0 ${path.width} ${path.height}`);
    svg.setAttribute('pointer-events', 'none'); 
    
    // Force to occupy the same space as the element
    svg.style.position = 'absolute';
    svg.style.top = '0px';
    svg.style.left ='0px';

    // Create a path
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    const elementStyle = window.getComputedStyle(element);
    const elementBorder_radius = elementStyle.borderRadius;
    const elementBorder_radius_value = parseInt(elementBorder_radius.replace('px', '')) + 1;

    const pathString = `
      M 0 ${elementBorder_radius_value}
      Q 0 0 ${elementBorder_radius_value} 0
      H ${path.width - elementBorder_radius_value}
      Q ${path.width} 0 ${path.width} ${elementBorder_radius_value}
      V ${path.height - elementBorder_radius_value}
      Q ${path.width} ${path.height} ${path.width - elementBorder_radius_value} ${path.height}
      H ${elementBorder_radius_value}
      Q 0 ${path.height} 0 ${path.height - elementBorder_radius_value}
      V ${elementBorder_radius_value}
    `;

    pathEl.setAttribute('d', pathString);
    pathEl.setAttribute('stroke', '#fefefe');
    pathEl.setAttribute('stroke-width', '2');
    pathEl.setAttribute('fill', 'transparent');

    svg.appendChild(pathEl);
    element.appendChild(svg);
    
    // Animate the path
    anime({
      targets: svg.querySelector('path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuad',
      duration: 300,
      delay: 0
    });

  }

  async animateFadeOut(element: HTMLElement){

    // Element has SVG?
    const svg_present_2 = element.querySelector('svg');
    if(!svg_present_2) return;

    // Animate svg fade out
    anime({
      targets: svg_present_2,
      opacity: [1, 0],
      duration: 300,
      easing: 'easeInOutQuad',
      complete: () => {
        try{ 
          element.removeChild(svg_present_2);
        } catch(e) { 
          // Do nothing, there are no consequences!
        }
      }
    });

  }

}