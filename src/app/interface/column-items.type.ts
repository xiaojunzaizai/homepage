// column-items.type.ts
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export type ColumnItemsForType<T> = {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<T> | boolean;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<T> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
};