import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-moblie',
  templateUrl: './player-moblie.component.html',
  styleUrls: ['./player-moblie.component.scss']
})
export class PlayerMoblieComponent implements OnInit {

  @Input() name: any;
  @Input() image!: '1.webp';
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
