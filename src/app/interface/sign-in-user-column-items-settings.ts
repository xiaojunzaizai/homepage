// sign-in-user-column-items.ts
import { ColumnItemsForType } from './column-items.type';
import { SignInUser } from '../interface/signInUser';

export type SignInUserColumnItems = ColumnItemsForType<SignInUser>;
export type StringColumnItems = ColumnItemsForType<string>;
export type NumberColumnItems = ColumnItemsForType<number>;
export type StringOrNumberColumnItems = ColumnItemsForType<string|number>;

export type StringNumberColumnItems = StringColumnItems|NumberColumnItems;
