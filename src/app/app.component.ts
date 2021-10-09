import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Member } from './utils/member.interface';
import { members } from './utils/members';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    @ViewChild('drawer') sidenav: MatDrawer | undefined;

    unavailableMembers: Member[] = [];
    availableMembers: Member[] = members;
    courtOne: Member[] = [];
    courtTwo: Member[] = [];
    courtThree: Member[] = [];
    courtFour: Member[] = [];
    title = 'badminton-club-sorter';

    ngOnInit() {
        this.sidenav?.toggle();
    }

    constructor() {}

    drop(event: CdkDragDrop<Member[]>) {
        if (
            event.container.id === 'all' ||
            event.container.id === 'unavailableMembers'
        ) {
            this.handleEvent(event);
        } else {
            if (event.container.data.length !== 4) {
                this.handleEvent(event);
            } else {
                moveItemInArray(
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex,
                );
            }
        }
    }

    handleEvent(event: CdkDragDrop<Member[]>) {
        if (event.dropPoint.x < 50) {
            transferArrayItem(
                this.availableMembers,
                this.unavailableMembers,
                event.previousIndex,
                this.unavailableMembers.length,
            );
        } else if (event.previousContainer !== event.container) {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        } else {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex,
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
                        this.availableMembers.length,
                    );
                }
                break;
            case 2:
                while (this.courtTwo.length > 0) {
                    transferArrayItem(
                        this.courtTwo,
                        this.availableMembers,
                        0,
                        this.availableMembers.length,
                    );
                }
                break;
            case 3:
                while (this.courtThree.length > 0) {
                    transferArrayItem(
                        this.courtThree,
                        this.availableMembers,
                        0,
                        this.availableMembers.length,
                    );
                }
                break;
            case 4:
                while (this.courtFour.length > 0) {
                    transferArrayItem(
                        this.courtFour,
                        this.availableMembers,
                        0,
                        this.availableMembers.length,
                    );
                }
                break;
        }
    }

    toggleSidenav() {
        if (!this.sidenav?.opened) {
            this.sidenav?.toggle();
        }
    }
}
