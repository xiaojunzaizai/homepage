import { SignInUser } from "../signInUser";

export function isExistedByFirstname(userlist:SignInUser[], lastName:string,middleName?:string):boolean{
    if(!userlist){ return false;}
    const resultSize = userlist.filter(user=> user.lastName.toLowerCase() === lastName.toLowerCase() && 
    (middleName === undefined || middleName === '' || user.middleName.toLowerCase() === middleName.toLowerCase())).length;
    return resultSize>0;
}
export function isExistedByLastname(userlist:SignInUser[],firstName:string, middleName?:string):boolean{
    if(!userlist){ return false;}
    const resultSize = userlist.filter(user=> user.firstName.toLowerCase() === firstName.toLowerCase() && 
    (middleName === undefined || middleName === '' || user.middleName.toLowerCase() === middleName.toLowerCase())).length;
    return resultSize>0;
}