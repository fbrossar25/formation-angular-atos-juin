import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective implements OnChanges {
  @Input() appState!: string;
  @HostBinding('class') hostClass!: string;
  constructor() {}

  ngOnChanges(): void {
    this.hostClass = `state-${this.appState.toLowerCase()}`;
  }
}
