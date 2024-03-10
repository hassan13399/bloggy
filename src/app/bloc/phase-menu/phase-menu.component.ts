import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-phase-menu',
  templateUrl: './phase-menu.component.html',
  styleUrls: ['./phase-menu.component.scss']
})
export class PhaseMenuComponent implements OnInit {

  @Input() menu;
  @Input() activePhase;

  constructor() {
  }

  ngOnInit() {
  }

  setActive(value) {
    this.activePhase.next(value);
  }

}
