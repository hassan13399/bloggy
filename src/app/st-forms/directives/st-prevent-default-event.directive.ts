import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[stPreventDefaultEvent]'
})
export class StPreventDefaultEventDirective
{
  @HostListener('click', ['$event'])
  public onClick(event: any): void
  {
    event.preventDefault();
  }
}