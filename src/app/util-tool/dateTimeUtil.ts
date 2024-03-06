import { isEqual, isAfter, isBefore, formatISO } from 'date-fns';



// combin date picker and time picker and generate a new string format selected date & time.
export function cleanUpDateAndTime(date:Date, time:Date):string{
    const newDateTime = new Date(date);
    newDateTime.setHours(time.getHours());
    newDateTime.setMinutes(time.getMinutes());
    newDateTime.setSeconds(0);
    newDateTime.setMilliseconds(0);
    return formatISO(newDateTime);

}

// use in initial time setting
export function adjustMinutes(date: Date): Date {
  const minutes = date.getMinutes();
  let adjustedMinutes = 0;

  if (minutes >= 1 && minutes <= 15) {
    adjustedMinutes = 15;
  } else if (minutes >= 16 && minutes <= 30) {
    adjustedMinutes = 30;
  } else if (minutes >= 31 && minutes <= 45) {
    adjustedMinutes = 45;
  } else if (minutes >= 46 || minutes === 0) {
    adjustedMinutes = 0;
  }
  // 创建一个新的 Date 对象以避免修改原始日期
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(adjustedMinutes);
  // 如果原始分钟数大于 46，则小时数需要加 1
  if (minutes >= 46) {
    adjustedDate.setHours(date.getHours() + 1);
  }
  return adjustedDate;
}

//check whether selected date&time is in user sign date list.
export function compareDateAndTime(userSignDate:string[],selectedDate:Date, selectedTime:Date):boolean{
 const selectedDateAndTime = cleanUpDateAndTime(selectedDate,selectedTime);
 if(userSignDate.includes(selectedDateAndTime)){
   return false;
 } else {
   return true;
 }
}
