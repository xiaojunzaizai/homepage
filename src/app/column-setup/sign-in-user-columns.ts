// sign-in-user-columns.ts
import { ColumnItems } from '../interface/column-items';
import { SignInUserColumnItems, StringColumnItems, StringNumberColumnItems, NumberColumnItems, StringOrNumberColumnItems } from '../interface/sign-in-user-column-items-settings';
import { parseISO, compareAsc } from 'date-fns';
import {isString, isValidNumber} from '../util-tool/utilManagement'

export const IDColumn:ColumnItems<number> = {
    name: 'ID',
    sortOrder: null,
    sortFn: (a: number, b: number) => a - b,
    sortDirections: ['ascend','descend', null],
    listOfFilter: [],
    filterFn: null,
    filterMultiple: true
}

export const nameColumn:ColumnItems<string>={
    name: 'Name',
    sortOrder: null,
    sortFn: (a: string, b: string) => a.localeCompare(b),
    sortDirections: ['ascend','descend', null],
    listOfFilter: [],
    filterFn: null,
    filterMultiple: true
}

export const  signInDateColumn:ColumnItems<string>={
    name: 'Sign In Date',
    sortOrder: 'descend',
    sortFn: (a: string, b: string) => {
      // 获取最后一个签到日期，并转换为Date对象
      const lastSignDateA = parseISO(a);
      const lastSignDateB = parseISO(b);
      // 比较两个日期
      return compareAsc(lastSignDateA, lastSignDateB);
    },
    sortDirections: ['ascend','descend', null],
    listOfFilter: [],
    filterFn: null,
    filterMultiple: true
}

export const signInUserColumns: StringOrNumberColumnItems[] = [

    {
        name: ' User ID',
        sortOrder: null,
        sortFn: (a: number|string, b: number|string) => {
            if(isValidNumber(a) && isValidNumber(b)){
                return (a as number) - (b as number);
            } else {
                return 0;
            }
            },
        sortDirections: ['ascend','descend', null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true
    },
    {
        name: 'Name',
        sortOrder: null,
        sortFn: (a: number|string, b: number|string) => {
            if(isString(a) && isString(b)){
                return (a as string).localeCompare(b as string)
            } else {
                return 0;
            }
            
            },
        sortDirections: ['ascend','descend', null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true
    },
    {
        name: 'Sign In Date',
        sortOrder: 'descend',
        sortFn: (a: number|string, b: number|string) => {
            if(isString(a) && isString(b)){
                // 获取最后一个签到日期，并转换为Date对象
                const lastSignDateA = parseISO(a as string );
                const lastSignDateB = parseISO(b as string);
                // 比较两个日期
                return compareAsc(lastSignDateA, lastSignDateB);
            } else {
                return 0;
            }

        },
        sortDirections: ['ascend','descend', null],
        listOfFilter: [],
        filterFn: null,
        filterMultiple: true
    }
];
