import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AppService } from '../app.service';
import { ApiMaterialTableDatasource } from './api-material-table-datasource';

@Component({
  selector: 'app-material-table',
  template: `
    <div class="mat-elevation-z8">
      <table mat-table #table [dataSource]="dataSource" matSort aria-label="Elements">

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let row">
            <button mat-button (click)="edit(row)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-button (click)="delete(row)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <ng-container *ngFor="let dynamicColumn of dynamicColumns">
          <ng-container matColumnDef="{{dynamicColumn.columnDef}}">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>{{dynamicColumn.header}}</th>
            <td mat-cell *matCellDef="let row">
              <ng-container *ngIf="dynamicColumn.link; else label">
                <a [routerLink]="dynamicColumn.link(row)">
                  {{dynamicColumn.cell(row)}}
                </a>
              </ng-container>
              <ng-template #label>
                {{dynamicColumn.cell(row)}}
              </ng-template>
            </td>
          </ng-container>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator #paginator
                     [length]="0"
                     [pageIndex]="0"
                     [pageSize]="10"
                     [pageSizeOptions]="[5, 10, 25, 50, 100, 250]">
      </mat-paginator>
    </div>
  `,
})
export class ApiMaterialTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // dataTableElements: Product[] = [];
  dataSource: ApiMaterialTableDatasource | null;

  /** Dynamically generated columns */
  dynamicColumns = [ {
    columnDef: 'id',
    header: 'ID',
    cell: row => row.id,
  }, {
    columnDef: 'name',
    header: 'Name',
    link: row => ([ row.id ]),
    cell: row => row.name,
  }, {
    columnDef: 'price',
    header: 'Price',
    cell: row => row.price,
  } ];

  /** Column definitions in order */
  displayedColumns = [
    ...this.dynamicColumns.map(x => x.columnDef),
    'actions',
  ];

  constructor(private service: AppService) {
  }

  ngOnInit() {
    this.dataSource = new ApiMaterialTableDatasource(this.service, this.paginator, this.sort);
  }

  edit(row) {
    console.log('delete', row);
  }

  delete(row) {
    console.log('delete', row);
  }
}
