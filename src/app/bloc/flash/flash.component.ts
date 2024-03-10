import { Component, OnInit, Input } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { StMessageService } from '../../st-forms/st-message.service';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit {

  @Input() destination;
  @Input() duration: number;
  public display = false;
  public message;

  constructor(private remoteService: StRemoteDataService, private msg: StMessageService) {

  }

  ngOnInit() {
    // Display Flash
    const message = this.msg.getFlash();
    if (message) {
      this.displayMessage(message);
    }

    // display message
    this.msg.getMessage(this.destination).subscribe(msgObj => {
      this.displayMessage(msgObj);
    });
  }

  protected displayMessage(message) {
    this.message = message;
    this.display = true;
    let duration =  message.duration;

    if (!duration) {
      duration = 5000;
    }

    setTimeout(function() {
      this.display = false;
    }.bind(this), duration);
  }
}