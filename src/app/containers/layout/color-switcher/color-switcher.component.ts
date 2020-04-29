import { Component, OnInit, Renderer2, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
})
export class ColorSwitcherComponent implements OnInit {

  colors: string[] = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel'];
  selectedColor: string = localStorage.getItem(environment.themeColorStorageKey) || environment.defaultColor;
  isOpenSwitcher = false;
  toggleClass = 'theme-colors';
  radius = localStorage.getItem(environment.themeRadiusStorageKey) || 'rounded';
  constructor(private renderer: Renderer2) {
    this.changeRadius(this.radius);
  }
  ngOnInit() {

  }

  changeColor(color: string) {
    this.selectedColor = color;
    localStorage.setItem(environment.themeColorStorageKey, color);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  toggleSwitcher(event) {
    this.isOpenSwitcher = !(this.isOpenSwitcher);
    this.toggleClass = this.isOpenSwitcher ? 'theme-colors shown' : 'theme-colors hidden';
    event.stopPropagation();
  }

  changeRadius(radius) {
    if (radius === 'flat') {
      this.renderer.removeClass(document.body, 'rounded');
    } else {
      this.renderer.addClass(document.body, 'rounded');
    }
    localStorage.setItem(environment.themeRadiusStorageKey, radius);
  }



  @HostListener('document:click', ['$event'])
  handleDocumentClick(event) {
    this.isOpenSwitcher = false;
    this.toggleClass = 'theme-colors hidden';
  }
}
