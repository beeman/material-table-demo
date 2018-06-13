import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService, Product } from '../app.service';

export class ApiMaterialTableDatasource extends DataSource<Product> {
  private subs: { [ key: string ]: Subscription } = {};
  data: Product[] = [];
  dataSubject = new BehaviorSubject<Product[]>([]);

  private filters = {
    sort: { active: '', direction: '' },
    limit: 10,
    offset: 0,
  };

  updateSortFilters(sort: Sort) {
    this.filters.sort = this.sort;
    this.loadItems();
  }

  updatePagingFilters(pageEvent: PageEvent) {
    this.filters.limit = pageEvent.pageSize;
    this.filters.offset = pageEvent.pageSize * pageEvent.pageIndex;
    this.loadItems();
  }

  constructor(
    private service: AppService,
    private paginator: MatPaginator,
    private sort: MatSort,
  ) {
    super();
    this.loadCount();
    this.loadItems();
    this.listenSort();
    this.listenPaging();
  }

  loadCount() {
    this.subs[ 'loadCount' ] = this.service.countItems()
      .subscribe(res => this.paginator.length = res);
  }

  loadItems() {
    this.subs[ 'loadItems' ] = this.service.getItems(this.filters)
      .subscribe((items) => {
        this.data = [ ...items ];
        this.dataSubject.next(this.data);
      });
  }

  listenSort() {
    this.subs[ 'listenSort' ] = this.sort.sortChange
      .subscribe(sorting => this.updateSortFilters(sorting));
  }

  listenPaging() {
    this.subs[ 'listenPaging' ] = this.paginator.page
      .subscribe(paging => this.updatePagingFilters(paging));
  }

  connect(): BehaviorSubject<any[]> {
    return this.dataSubject;
  }

  disconnect() {
    Object.keys(this.subs)
      .forEach((name) => this.subs[ name ].unsubscribe());
  }

}
