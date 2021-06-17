import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-lite',
  templateUrl: './table-lite.component.html',
  styleUrls: ['./table-lite.component.scss'],
})
export class TableLiteComponent implements OnInit {
  @Input() public headers!: string[];

  constructor() {}

  ngOnInit(): void {}
}
