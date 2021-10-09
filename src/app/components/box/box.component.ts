import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/utils/member.interface';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input() boxItems: Member[] = [];

  constructor() {}

  ngOnInit(): void {}
}
