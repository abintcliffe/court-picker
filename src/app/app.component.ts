import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
} from '@angular/cdk/drag-drop';
import { members } from './utils/members';
import { Level, Member } from './utils/member.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  availableMembers: Member[] = members;
  courtOne: Member[] = [];
  courtTwo: Member[] = [];
  courtThree: Member[] = [];
  courtFour: Member[] = [];
  title = 'badminton-club-sorter';

  drop(event: CdkDragDrop<Member[]>) {
    if (event.item.dropContainer.id === 'all') {
      if (event.container.data.length !== 4) {
        this.handleEvent(event);
      }
    } else {
      this.handleEvent(event);
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  handleEvent(event: CdkDragDrop<Member[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  reset(courtList: number) {
    switch (courtList) {
      case 1:
        while (this.courtOne.length > 0) {
          transferArrayItem(
            this.courtOne,
            this.availableMembers,
            0,
            this.availableMembers.length
          );
        }
        break;
      case 2:
        while (this.courtTwo.length > 0) {
          transferArrayItem(
            this.courtTwo,
            this.availableMembers,
            0,
            this.availableMembers.length
          );
        }
        break;
      case 3:
        while (this.courtThree.length > 0) {
          transferArrayItem(
            this.courtThree,
            this.availableMembers,
            0,
            this.availableMembers.length
          );
        }
        break;
      case 4:
        while (this.courtFour.length > 0) {
          transferArrayItem(
            this.courtFour,
            this.availableMembers,
            0,
            this.availableMembers.length
          );
        }
        break;
    }
  }
}
