import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  @Input() podium: [{ name: string, photo: string, points: number }];
  @Input() isRanking: boolean;
  @Input() isAllowed: boolean;

  constructor() { }

  public ngOnInit() {
  }

}
