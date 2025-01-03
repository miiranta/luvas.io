import { Component, Input, NgModule, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';
import { GlassRedirectService } from '../services/glass-redirect/glass-redirect.service';

import { SimplebarAngularModule } from 'simplebar-angular';
import anime from 'animejs';

interface GlassSelectorItems {
  title: string;
  description: string;
  img_src: string;
  link: string;
  tags?: string[];
  show?: boolean;
}

interface GlassSelectorConfig {
  title: string;
  width?: string;
  height?: string;
}

interface TagAndFreq {
  tag: string;
  freq: number;
  selected?: boolean;
}

@Component({
  selector: 'glass-selector',
  imports: [SimplebarAngularModule, CommonModule, RouterModule],
  templateUrl: './glass-selector.component.html',
  styleUrl: './glass-selector.component.scss'
})
export class GlassSelectorComponent {

  private eventService: GlassDoceventsService = inject(GlassDoceventsService);
  redirectService: GlassRedirectService = inject(GlassRedirectService);

  @Input() items: GlassSelectorItems[] = [];
  @Input() config: GlassSelectorConfig = { title: 'Title', width: '100%', height: '100%' };

  @ViewChild('simplebar_list_instance') simplebar_list_instance: any;
  
  private simplebar_scroll_instance: any;
  private picker_instance: any;
  private selected_instance: any;

  private runningJump = false;

  private searchTags: string[] = [];
  tagAndFreq: TagAndFreq[] = [];

  picker_open = false;
  private picker_enable_outside_click = false;

  simpleBarOptions = { 
    autoHide: true, 
    scrollbarMinSize: 100,
  };

  simpleBarOptionsTP = { 
    autoHide: false, 
    scrollbarMinSize: 100,
  };

  ngOnInit() {

    //
    this.processTags(this.items);
    this.items_update_visibility();

    // Add click callback for picker_update_close
    this.eventService.addCallbackToMouseClick((event: any) => {
      return this.picker_update_close(event);
    });

    // Add click callback for onSelectedInstanceClick
    this.eventService.addCallbackToMouseClick((event: any) => {
      return this.onSelectedInstanceClick(event);
    });

    // Add resize callback
    this.eventService.addCallbackToWindowResize((event: any) => {
      return this.onWindowResize(event);
    });
  }

  ngAfterViewInit() {

    // Add scroll event listener
    this.simplebar_scroll_instance = this.simplebar_list_instance.SimpleBar.getScrollElement();
    this.simplebar_scroll_instance.addEventListener('scroll', (event: Event) => {
      this.animateCenterPop(this.simplebar_scroll_instance);
    });

    this.animateCenterPop(this.simplebar_scroll_instance, 0);

  }

  async animateFadeIn(element: HTMLElement){
    
    anime({
      targets: element,
      opacity: [0.9, 1],
      duration: 100,
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

  async animateCenterPop(element: HTMLElement, force: any = undefined){
 
    if(this.runningJump) return;
    if(!element) return;
    
    const elem_height = element.getBoundingClientRect().height;

    const items = element.querySelectorAll('.glass-selector-item');
    const items_pos: DOMRect[] = [];
    items.forEach((item) => {
      const item_pos = item.getBoundingClientRect();
      items_pos.push(item_pos);
    });

    // Which item is in the center?
    let center_item = 0;
    let center_item_pos = 0;
    let center_item_distance = elem_height;
    items_pos.forEach((item_pos, index) => {
      const item_distance = Math.abs(item_pos.top - (elem_height / 2));
      if(item_distance < center_item_distance){
        center_item = index;
        center_item_pos = item_pos.top;
        center_item_distance = item_distance;
      }
    });

    // Startup?
    if(force !== undefined) center_item = force;

    // Scale the center item
    items.forEach((item, index) => {
      if(index === center_item){
        (item as HTMLElement).style.scale = '1';
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.zIndex = '1';
        if(force == undefined) this.animateFadeIn(item as HTMLElement);
        this.selected_instance = item;
      } 
      else if (index === center_item - 1 || index === center_item + 1){
        (item as HTMLElement).style.scale = '0.9';
        (item as HTMLElement).style.opacity = '0.8';
        (item as HTMLElement).style.zIndex = '0';
        this.animateFadeOut(item as HTMLElement);
      }
      else if (index === center_item - 2 || index === center_item + 2){
        (item as HTMLElement).style.scale = '0.8';
        (item as HTMLElement).style.opacity = '0.6';
        (item as HTMLElement).style.zIndex = '0';
      }
      else {
        (item as HTMLElement).style.scale = '0.7';
        (item as HTMLElement).style.opacity = '0.4';
      }
    });

  }

  centerItem(element: HTMLElement, simplebar: any){
    this.runningJump = true;

    const simplebar_scroll = simplebar.SimpleBar.getScrollElement();
    const target_scrolltop = element.offsetTop - 100;

    anime({
      targets: simplebar_scroll,
      scrollTop: target_scrolltop,
      duration: 200,
      easing: 'easeInOutQuad',
      complete: () => {
        this.runningJump = false;
        this.animateCenterPop(simplebar_scroll);
      }
    });

  }

  centerTop(simplebar: any){
    this.runningJump = true;

    const simplebar_scroll = simplebar.SimpleBar.getScrollElement();
    const target_scrolltop = 0;

    anime({
      targets: simplebar_scroll,
      scrollTop: target_scrolltop,
      duration: 200,
      easing: 'easeInOutQuad',
      complete: () => {
        this.runningJump = false;
        this.animateCenterPop(simplebar_scroll);
      }
    });
  }

  processTags(items: GlassSelectorItems[]){
      
    // Process tags
    items.forEach((item) => {
      item.tags = this.filterTags(item.tags || []);
    });

    // Count frequency
    this.tagAndFreq = items.reduce((acc: TagAndFreq[], item) => {
      item.tags?.forEach((tag) => {
        const index = acc.findIndex((tagAndFreq) => tagAndFreq.tag === tag);
        if(index === -1) acc.push({ tag, freq: 1, selected: true });
        else acc[index].freq++;
      });
      return acc;
    }, []);

    // Add ALL tag in the beginning	
    this.tagAndFreq.unshift({ tag: 'ALL', freq: items.length, selected: true });

    // Add tags to searchTags
    this.searchTags = this.tagAndFreq.map((tagAndFreq) => tagAndFreq.tag);

    // Sort by frequency
    this.tagAndFreq.sort((a, b) => b.freq - a.freq);

  }

  filterTags(tags: string[]): string[] {
   
    // All uppercase
    tags = tags.map((tag) => tag.toUpperCase());

    // Trim
    tags = tags.map((tag) => tag.trim());

    // Remove duplicates
    tags = tags.filter((tag, index) => tags.indexOf(tag) === index);

    // 0 length > add OTHER
    if(tags.length === 0) tags.push('OTHER');

    return tags;
  }

  picker_update_selection(picker: HTMLElement, checkbox: HTMLInputElement){
    
    // Check all tags
    let tags = picker.querySelectorAll('.glass-selector-tagpicker-item input');

    // Is checkbox ALL?
    if(checkbox.name === 'ALL'){

      // Check all tags equal to ALL
      tags.forEach((tag) => {
        (tag as HTMLInputElement).checked = checkbox.checked;
      });

    }

    // It´s not ALL
    else {
      let tagAll = Array.from(tags).filter((tag) => (tag as HTMLInputElement).name === 'ALL')[0];
      let tags_minus_all = Array.from(tags).filter((tag) => (tag as HTMLInputElement).name !== 'ALL');

      const all_tags_selected = Array.from(tags_minus_all).every((tag) => (tag as HTMLInputElement).checked);
      if(all_tags_selected) {
        // If every tag is checked (except ALL), check ALL
        (tagAll as HTMLInputElement).checked = true;
      }
      else {
        // If not every tag is checked (except ALL), uncheck ALL
        (tagAll as HTMLInputElement).checked = false;
      }
      
    }

    // Update selection (tagAndFreq -- where the checkboxes state is saved) 
    tags.forEach((tag) => {
      const name = (tag as HTMLInputElement).name;
      const checked = (tag as HTMLInputElement).checked;
      this.tagAndFreq = this.tagAndFreq.map((tagAndFreq) => {
        if(tagAndFreq.tag === name) tagAndFreq.selected = checked;
        return tagAndFreq;
      });
    });

    // Update search tags index
    tags.forEach((tag) => {
      const name = (tag as HTMLInputElement).name;
      const checked = (tag as HTMLInputElement).checked;

      if(checked && this.searchTags.indexOf(name) === -1) this.searchTags.push(name);
      else if(!checked && this.searchTags.indexOf(name) !== -1) this.searchTags = this.searchTags.filter((tag) => tag !== name);
    });

    // Update visibility
    this.items_update_visibility();

    //Center top
    this.centerTop(this.simplebar_list_instance);
  }

  async picker_update_open(picker_wrap: HTMLElement){
    this.picker_open = true;

    // Wait for the picker to be rendered
    while(!picker_wrap.querySelector('.glass-selector-tagpicker-options')) await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get picker instance
    this.picker_instance = picker_wrap.querySelector('.simplebar-wrapper');

    //
    this.picker_enable_outside_click = true;
  }
  
  picker_update_close(event: any) {
    if(!this.picker_enable_outside_click) return;
    if(!this.picker_open) return;
    if(!this.picker_instance) return;

    const picker = this.picker_instance;
    
    // Get mouse position
    const mousePos = this.eventService.getMousePosition();

    // Is the mouse inside the picker?
    let is_inside = this.eventService.isInViewport(picker, mousePos.x, mousePos.y);
    if(is_inside) return;

    this.picker_enable_outside_click = false;
    this.picker_open = false;
  }

  items_update_visibility(){
    this.items = this.items.map((item) => {
      item.show = this.searchTags.some((tag) => item.tags?.includes(tag)) || this.searchTags.includes('ALL');
      return item;
    });
  }

  onWindowResize(event: any){// This is a small graphics bug fix
    if(!this.simplebar_list_instance) return;
    if(!this.simplebar_list_instance.SimpleBar) return;

    const sb_scroll_elem = this.simplebar_list_instance.SimpleBar.getScrollElement();

    // Get items
    let items = sb_scroll_elem.querySelectorAll('.glass-selector-item');

    // Filter the ones with SVG
    let items_with_svg = Array.from(items).filter((item) => (item as HTMLElement).querySelector('svg'));

    // Fade out the SVGs
    items_with_svg.forEach((item) => {
      this.animateFadeOut(item as HTMLElement);
    });

  }

  onSelectedInstanceClick(event: any){
    if(!this.selected_instance) return;

    const mousePos = this.eventService.getMousePosition();
    const click_is_in = this.eventService.isInViewport(this.selected_instance, mousePos.x, mousePos.y);
    if(!click_is_in) return;

    if(this.picker_open) return;

    // Get the link
    const link = this.selected_instance.querySelector('.glass-selector-item-link');
    
    // Click the link
    // Thats the same as clicking "see more", it will run navigateTo
    link.click();

  }

}
