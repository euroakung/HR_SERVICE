import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html'
})
export class LayoutsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addTagFn(addedName) {
    return { name: addedName, tag: true };
  }

}
