import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/utils/member.interface';
import { TitleCasePipe } from '@angular/common';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-member-managment-dialog',
    templateUrl: './member-managment-dialog.component.html',
    styleUrls: ['./member-managment-dialog.component.scss'],
})
export class MemberManagmentDialogComponent implements OnInit {
    @Output() updateMemberEvent = new EventEmitter();
    gridApi: GridApi | undefined;

    columnDefs: any[] = [
        {
            headerName: 'Name',
            colId: 'name',
            field: 'name',
            width: 340,
        },
        {
            headerName: 'Level',
            colId: 'level',
            field: 'level',
            valueFormatter: (data: any) => {
                return this.titeCase.transform(data.value);
            },
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['yellow', 'green', 'blue', 'red'],
            },
            width: 90,
        },
        {
            headerName: 'Rank',
            colId: 'rank',
            field: 'rank',
            width: 90,
        },
        {
            headerName: '',
            field: 'delete',
            flex: 1,
            cellRenderer: () => {
                return `<span class="material-icons icon__delete"> delete_forever </span>`;
            },
            editable: false,
            filter: false,
            sortable: false,
        },
    ];
    defaultColDef = {
        filter: true,
        editable: true,
        sortable: true,
    };

    rowData: Member[] = [];

    constructor(private titeCase: TitleCasePipe) {}

    ngOnInit(): void {
        this.rowData = JSON.parse(localStorage.members);
    }

    onGridReady(params: any) {
        console.log(params);
        this.gridApi = params.api;
    }

    updateMembers() {
        localStorage.members = JSON.stringify(this.rowData);
        this.updateMemberEvent.emit('');
    }

    handelEvent(event: any) {
        if (event.column.colId === 'delete') {
            this.rowData.splice(event.rowIndex, 1);

            localStorage.members = JSON.stringify(this.rowData);
            this.updateMemberEvent.emit('');

            this.rowData = JSON.parse(localStorage.members);

            this.gridApi?.refreshCells();
        }
    }
}
