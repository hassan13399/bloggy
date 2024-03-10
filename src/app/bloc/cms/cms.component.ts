import { Component, OnInit, Input } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { StMessageService } from '../../st-forms/st-message.service';

@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  page;
  lang: string;
  @Input() category: string;
  @Input() mode = 'page';
  @Input() additionalComponentBottom: null|string = null;
  @Input() additionalComponentTop: null|string = null;

  constructor(private remoteService: StRemoteDataService, private msg: StMessageService) { }

  ngOnInit() {
    this.remoteService.cmsFindOne(this.category).subscribe(data => {
      this.page = data;
      this.lang = localStorage.getItem('lang');
      this.pageLocalize(['title', 'teaser', 'body']);

      this.msg.getMessage('lang').subscribe(message => {
        this.lang = message.text;
        this.pageLocalize(['title', 'teaser', 'body']);
      });
    });
  }

  pageLocalize(fieldArray) {
    fieldArray.forEach(function(field) {
      this.page[field] = this.page[field + '_' + this.lang];
    }.bind(this));
  }

}
