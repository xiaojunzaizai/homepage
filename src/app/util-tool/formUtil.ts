import { SignInUser } from "../signInUser";

export function formatForm(formValue: any): SignInUser{
    const newUser: SignInUser = {
        ...formValue,
        signDate: [], // 添加一个空数组的 signDate
      };
      return newUser
}