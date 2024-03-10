import { Component, OnInit, Input, Output } from '@angular/core';
import { StRemoteDataService } from '../../st-forms/st-remote-data.service';
import { EventEmitter } from '@angular/core';
import { StMessageService } from '../../st-forms/st-message.service';
import * as moment from 'moment';

@Component({
  selector: 'app-prono',
  templateUrl: './prono.component.html',
  styleUrls: ['./prono.component.scss']
})
export class PronoComponent implements OnInit {

  @Input() day;
  @Input() pronoDefInput;
  @Input() status; // open - closed - calculated
  @Input() isMyProno; // true if the prono are the user is the owner of the prono
  @Input() disableJoker; // true when another prono which is inactive has joker set to true
  @Output() changeJoker: EventEmitter<any> = new EventEmitter();
  @Input() isAllowedToEdit: boolean;
  @Output() hasEdited: EventEmitter<boolean> = new EventEmitter();
  @Output() notAllowedToEdit: EventEmitter<boolean> = new EventEmitter();
  @Output() askToEdit: EventEmitter<boolean> = new EventEmitter();
  @Input() confirmEdit: EventEmitter<boolean>;

  mode = 'show'; // edit (display form), show (display readonly prono)

  formGroup;
  pronoDef;
  pronoDefId;

  lang;
  host_team;
  host_team_flag;
  visitor_team;
  visitor_team_flag;
  multiplier = null;
  class_multiplier = null;
  bonus;
  bonusLabel;
  bonusSuffix;
  class_result;
  start_time;
  result_score_host;
  result_score_visitor;
  result_team1_id;
  result_team2_id;
  result_team3_id;
  result_player1_id;
  result_player2_id;
  prono_score_host;
  prono_score_visitor;
  prono;
  prono_points;
  result_team1_name;
  result_team2_name;
  result_team3_name;
  halftimeOptions: Array<{}>;
  result_player1_name;
  result_player2_name;
  prono_team1_ok_class = '';
  prono_team2_ok_class = '';
  prono_team3_ok_class = '';
  pronoWithJoker = false;
  pronoWithJokerClass = '';
  prono_joker_ok_class = '';
  result_score_ok = false;
  result_score_ok_class = '';
  players; // list of players
  teams; // list of teams

  private _isReadyToEdit = false;

  constructor(protected remoteDataService: StRemoteDataService, private msg: StMessageService) {}

  ngOnInit() {
    this.confirmEdit.subscribe((data) => {
      this.doEdit();
    });
    this.formGroup = this.pronoDefInput.formGroup;

    this.pronoDef = this.pronoDefInput.pronoDef;
    this.prono = this.pronoDefInput.prono;

    // day.with_joker
    if (this.pronoDef['day.with_joker']) {
      this.pronoWithJoker = true;
    }

    this.msg.getMessage('joker').subscribe(msg => {
      if (this.pronoDefId !== msg.text) {
        this.formGroup.patchValue({joker: false});
        if (this.prono) {
          this.prono['joker'] = false;
        }
        this.initValues();
      }
    });

    // set the status
    const startTs = moment(this.pronoDef['start_time']).utc().local().format('X');
    const nowTs = moment().utc().local().format('X');

    if (this.isMyProno && (nowTs < startTs)) {
      this.status = 'open';
    } else {
      if (!this.prono || this.prono['points'] !== null) {
        this.status = 'calculated';
      } else {
        this.status = 'closed';
      }
    }

    // disable formGroup if data for other user of if prono is closed
    // || this.status === 'calculated'
    if (!this.isMyProno || this.status === 'closed' || this.status === 'calculated' ) {
      this.formGroup.disable();
    }

    // for the mode to edit when no prono is saved and the status is open
    if (!this.prono && this.status === 'open') {
      this.mode = 'edit';
    }

    this.initValues();

    // detect change on joker and send information on the layer above to set (if allowed) the other joker to null
    this.formGroup.get('joker').valueChanges.subscribe(value => {
      const result = {
        pronoDefId: this.pronoDefId,
        value: value
      };
      // this.changeJoker.emit(result);
      if (value) {
        this.msg.sendMessage('joker', 'disable', this.pronoDefId);
      }
    });

    if (this.day === 'prologue') {
      this.remoteDataService.getRemoteAddress('data/players').subscribe(
        options => {
          this.players = options;
        }
      );

      this.remoteDataService.getRemoteAddress('data/{{lang}}/teams').subscribe(
        options => this.teams = options
      );
    }
  };

  initValues() {

    this.pronoDefId = this.pronoDef.id;
    this.bonus = this.pronoDef['day.bonus'];

    this.lang = localStorage.getItem('lang');
    if (this.pronoDef['host_team.name_' + this.lang]) {
      this.host_team = this.pronoDef['host_team.name_' + this.lang];
      this.host_team_flag = this.remoteDataService.getImagePath(this.pronoDef['host_team.flag']);
    }

    if (this.pronoDef['visitor_team.name_' + this.lang]) {
      this.visitor_team = this.pronoDef['visitor_team.name_' + this.lang];
      this.visitor_team_flag = this.remoteDataService.getImagePath(this.pronoDef['visitor_team.flag']);
    }

    this.start_time = this.pronoDef['start_time'];
    this.result_score_host = this.pronoDef['result_score_host'];
    this.result_score_visitor = this.pronoDef['result_score_visitor'];

    this.result_team1_id = this.pronoDef['result_team1.id'];
    if (this.prono && this.prono['team1_id']) {
      // a prono already exist
      this.result_team1_name = this.prono['team1']['name_' + this.lang];
    } else {
      // no prono has been saved
      // this.result_team1_id = this.pronoDef['result_team1.id'];
      this.result_team1_name = '';
    }

    if (this.prono && this.prono['team2_id']) {
      // a prono already exist
      this.result_team2_id = this.prono['team2_id'];
      this.result_team2_name = this.prono['team2']['name_' + this.lang];
    } else {
      // no prono has been saved
      this.result_team2_id = this.pronoDef['result_team2.id'];
      this.result_team2_name = '';
    }

    if (this.prono && this.prono['team3_id']) {
      // a prono already exist
      this.result_team3_id = this.prono['team3_id'];
      this.result_team3_name = this.prono['team3']['name_' + this.lang];
    } else {
      // no prono has been saved
      this.result_team3_id = this.pronoDef['result_team3.id'];
      this.result_team3_name = '';
    }

    this.result_player1_id = this.pronoDef['result_player1.id'];
    this.result_player1_name = this.pronoDef['result_player1.name'];
    this.result_player2_id = this.pronoDef['result_player2.id'];
    this.result_player2_name = this.pronoDef['result_player1.name'];

    if (this.result_score_host === this.prono_score_host && this.result_score_visitor === this.prono_score_visitor) {
      this.result_score_ok = true;
    }

    // affiche (x2 or x3)
    // attention, si on a une affiche, on n'a pas de prono
    if (this.pronoDef['multiplier'] && this.pronoDef['multiplier'] > 1) {
      this.multiplier = this.pronoDef['multiplier'];
      this.class_multiplier = 'match--with-affiche';
      this.pronoWithJoker = false;
    };

    if (this.pronoWithJoker) {
      this.pronoWithJokerClass = 'match--with-joker';
    }

    if (this.prono) {
      this.prono_score_host = this.prono['score_host'] == null ? '-' : this.prono['score_host'];
      this.prono_score_visitor = this.prono['score_visitor'] == null ? '-' : this.prono['score_visitor'];

      if (this.prono['team1'] && this.status === 'calculated') {
        this.prono_team1_ok_class = this.result_team1_id === this.prono['team1']['id'] ? 'bonus--success' : 'bonus--fail';
      }

      if (this.prono['team2']) {
        this.prono_team2_ok_class = this.result_team2_id === this.prono['team2']['id'] ? 'coloured' : '';
      }

      if (this.prono['team3']) {
        this.prono_team3_ok_class = this.result_team3_id === this.prono['team3']['id'] ? 'coloured' : '';
      }

      if (this.pronoWithJoker) {
        this.prono_joker_ok_class = this.prono['joker'] ? 'joker--enabled' : 'joker--disabled';
      }

      this.prono_points = this.prono['points'] == null ? '-' : this.prono['points'];

      if(!this.prono['team1_id']) {
        this.formGroup.patchValue({
          team1_id: 0
        });
      }
    } else {
      this.prono_score_host = '-';
      this.prono_score_visitor = '-';
      this.result_team1_name = '-';
      this.prono_points = '-';
      this.formGroup.patchValue({
        team1_id: 0
      });
    }

    // @TODO dynamiser
    this.result_score_ok = false;
    if (this.result_score_host === this.result_score_visitor && this.prono_score_host === this.prono_score_visitor) {
      this.result_score_ok = true;
    }
    if (this.result_score_host > this.result_score_visitor && this.prono_score_host > this.prono_score_visitor) {
      this.result_score_ok = true;
    }
    if (this.result_score_host < this.result_score_visitor && this.prono_score_host < this.prono_score_visitor) {
      this.result_score_ok = true;
    }

    if (this.status === 'calculated') {
      this.result_score_ok_class = this.result_score_ok ? 'match--success' : 'match--fail';
    } else {
      this.result_score_ok_class = 'match--open';
    }

    if (this.status === 'calculated') {
      this.class_result = 'col-sm-9 col-md-10';
    } else {
      this.class_result = 'col-12';
    }

    // prepare label for halftime options
    this.bonusLabel = '';
    this.bonusSuffix = '';

    let firstChoice = {};

    switch (this.bonus) {
      case 'match':
        this.bonusLabel = 'LABEL.__Bonus_vainqueur';
        this.bonusSuffix = 'LABEL.__remporte_le_match';
        firstChoice = {
          label: 'LABEL.__Bonus_vainqueur',
          value: 0
        };
        break;
      case 'halftime':
        this.bonusLabel = 'LABEL.__Bonus_mi-temps';
        this.bonusSuffix = 'LABEL.__mène_à_la mi-temps';
        firstChoice = {
          label: 'LABEL.__Bonus_mi-temps',
          value: 0
        };
        break;
    }

    // be carefull, team
    this.halftimeOptions = [
      {
        label: this.host_team,
        value: this.pronoDef['host_team_id'],
        suffix: this.bonusSuffix
      },
      {
        label: this.visitor_team,
        value: this.pronoDef['visitor_team_id'],
        suffix: this.bonusSuffix
      }
    ];

    // the option duce at halftime exists only for bonus halftime
    // we add this at first positions of the halftime options
    if (this.bonus === 'halftime') {
      this.halftimeOptions.push({
        label: 'LABEL.__halftime_duce',
        value: 1
      });
    }

    this.halftimeOptions.unshift(firstChoice);
  }

  edit() {
    this._isReadyToEdit = true;
    if (this.isAllowedToEdit) {
      this.askToEdit.emit(true);
    } else {
      this.notAllowedToEdit.emit(true);
    }
  }

  show() {
    this._isReadyToEdit = false;
    this.mode = 'show';
  }

  saveProno(type='default') {
    this.remoteDataService.saveProno(this.pronoDefId, this.formGroup.value)
      .subscribe(prono => {
        this.formGroup.patchValue(prono);
        this.hasEdited.emit(true);
        this._isReadyToEdit = false;
        // update values
        this.prono = prono;
        this.initValues();

        // set mode to show
        this.show();

        if (type === 'prologue') {
          // send message
          this.msg.sendMessage('prono', 'success', 'FORM_LABEL.data_saved');

          // scroll to topµ
          window.scrollTo(0, 0);
        }

      });
  };

  public doEdit() {
    if (this._isReadyToEdit) {
      this.mode = 'edit';
    }
  }
}