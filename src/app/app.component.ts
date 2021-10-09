import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MemberManagmentDialogComponent } from './components/member-managment-dialog/member-managment-dialog.component';
import { MembersDialogComponent } from './components/members-dialog/members-dialog.component';
import { Member } from './utils/member.interface';
import { members } from './utils/members';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    @ViewChild('drawer') sidenav: MatDrawer | undefined;

    unavailableMembers: Member[] = [];
    availableMembers: Member[] = [];
    courtOne: Member[] = [];
    courtTwo: Member[] = [];
    courtThree: Member[] = [];
    courtFour: Member[] = [];
    title = 'badminton-club-sorter';

    ngOnInit(): void {
        if (localStorage.getItem('members')) {
            this.unavailableMembers = JSON.parse(localStorage.members);
        } else {
            this.unavailableMembers = members;
            localStorage.members = JSON.stringify(this.unavailableMembers);
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            if (!this.sidenav?.opened) {
                this.sidenav?.open();
            }
        }, 500);
    }

    constructor(public dialog: MatDialog) {}

    drop(event: CdkDragDrop<Member[]>): void {
        if (
            event.container.id === 'all' ||
            event.container.id === 'unavailableMembers'
        ) {
            this.handleEvent(event);
        } else {
            if (event.container.data.length !== 4) {
                this.handleEvent(event);
            } else {
                if (event.previousContainer === event.container) {
                    moveItemInArray(
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex,
                    );
                }
            }
        }
    }

    handleEvent(event: CdkDragDrop<Member[]>): void {
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

    reset(courtList: number): void {
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

    openMemberDialog(): void {
        const dialogRef = this.dialog.open(MembersDialogComponent);

        dialogRef.componentInstance.addMemberEvent.subscribe(
            (result: Member) => {
                this.unavailableMembers.unshift(result);
                this.saveAllMembers();
            },
        );
    }

    openMemberManagementDialog(): void {
        const dialogRef = this.dialog.open(MemberManagmentDialogComponent);

        dialogRef.componentInstance.updateMemberEvent.subscribe(() => {
            this.unavailableMembers = JSON.parse(localStorage.members);
            this.availableMembers = [];
            this.courtOne = [];
            this.courtTwo = [];
            this.courtThree = [];
            this.courtFour = [];
        });
    }

    saveAllMembers(): void {
        const allMembers: Member[] = [];

        this.unavailableMembers.forEach((member: Member) => {
            allMembers.push(member);
        });

        this.availableMembers.forEach((member: Member) => {
            allMembers.push(member);
        });

        this.courtOne.forEach((member: Member) => {
            allMembers.push(member);
        });

        this.courtTwo.forEach((member: Member) => {
            allMembers.push(member);
        });

        this.courtThree.forEach((member: Member) => {
            allMembers.push(member);
        });

        this.courtFour.forEach((member: Member) => {
            allMembers.push(member);
        });

        localStorage.members = JSON.stringify(allMembers);
    }

    toggleSidenav(): void {
        if (!this.sidenav?.opened) {
            this.sidenav?.toggle();
        }
    }
}
