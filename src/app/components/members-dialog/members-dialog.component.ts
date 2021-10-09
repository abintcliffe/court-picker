import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Level } from 'src/app/utils/member.interface';

@Component({
    selector: 'app-members-dialog',
    templateUrl: './members-dialog.component.html',
    styleUrls: ['./members-dialog.component.scss'],
})
export class MembersDialogComponent implements OnInit {
    @Output() addMemberEvent = new EventEmitter();
    memberForm: FormGroup = this.fb.group({});
    levels: Level[] = [Level.Yellow, Level.Green, Level.Blue, Level.Red];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.memberForm = this.fb.group({
            name: ['', Validators.required],
            rank: [],
            level: ['yellow'],
        });
    }

    addMember(): void {
        if (this.memberForm.valid) {
            this.addMemberEvent.emit(this.memberForm.value);
            this.memberForm.patchValue({
                name: '',
                rank: null,
                level: 'yellow',
            });
        }
    }
}
