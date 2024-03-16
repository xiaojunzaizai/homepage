import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
// import { SignInUser } from "./signInUser";

export interface ColumnItems<T> {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<T> | boolean;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<T> | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
}
