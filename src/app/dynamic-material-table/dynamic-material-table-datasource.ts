import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MaterialTableItem {
  name: string;
  id: number;
  color: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MaterialTableItem[] = [
  {id: 1, name: 'Hydrogen', color: 'blue' },
  {id: 2, name: 'Helium', color: 'blue' },
  {id: 3, name: 'Lithium', color: 'blue' },
  {id: 4, name: 'Beryllium', color: 'blue' },
  {id: 5, name: 'Boron', color: 'blue' },
  {id: 6, name: 'Carbon', color: 'blue' },
  {id: 7, name: 'Nitrogen', color: 'blue' },
  {id: 8, name: 'Oxygen', color: 'blue' },
  {id: 9, name: 'Fluorine', color: 'blue' },
  {id: 10, name: 'Neon', color: 'blue' },
  {id: 11, name: 'Sodium', color: 'blue' },
  {id: 12, name: 'Magnesium', color: 'blue' },
  {id: 13, name: 'Aluminum', color: 'blue' },
  {id: 14, name: 'Silicon', color: 'blue' },
  {id: 15, name: 'Phosphorus', color: 'blue' },
  {id: 16, name: 'Sulfur', color: 'blue' },
  {id: 17, name: 'Chlorine', color: 'blue' },
  {id: 18, name: 'Argon', color: 'blue' },
  {id: 19, name: 'Potassium', color: 'blue' },
  {id: 20, name: 'Calcium', color: 'blue' },
];

/**
 * Data source for the MaterialTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DynamicMaterialTableDatasource extends DataSource<MaterialTableItem> {
  data: MaterialTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MaterialTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MaterialTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MaterialTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
