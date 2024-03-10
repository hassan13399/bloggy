import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level2-menu',
  templateUrl: './level2-menu.component.html',
  styleUrls: ['./level2-menu.component.scss']
})
export class Level2MenuComponent implements OnInit {

  @Input() menu;
  @Input() activeItem;

  constructor() { }

  ngOnInit() {
  }

  setActive(value) {
    this.activeItem.next(value);
  }

}
