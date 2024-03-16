import { isEqual, isAfter, isBefore, formatISO, differenceInCalendarDays, format, parseISO } from 'date-fns';



// combin date picker and time picker and generate a new string format selected date & time.
export function cleanUpDateAndTime(date?:Date, time?:Date):string{
  if(!date || !time){return '';}
  const newDateTime = new Date(date);
  newDateTime.setHours(time.getHours());
  newDateTime.setMinutes(time.getMinutes());
  newDateTime.setSeconds(0);
  newDateTime.setMilliseconds(0);
  return formatISO(newDateTime);

}

// use in initial time setting
export function adjustMinutes(date?: Date): Date|undefined {
  if (!date){
    return date;
  }
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

export function adjustDay(date?:Date):Date|undefined{
  if (!date){
    return date;
  }
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const adjustedDate = new Date(date);
  if (minutes>=46 && hours>=23){
    adjustedDate.setDate(date.getDate()+1);
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

export function disableDate() {
  return (current: Date): boolean => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    // 禁止选择今天及今天之前的日期
    const hours = today.getHours();
    if (hours >=23){
      return differenceInCalendarDays(current, tomorrow) > 0;
    }
    return differenceInCalendarDays(current, today) > 0;
  };
}

export function formatDateAndTime(date:string):string{
  const formattedDates = format(parseISO(date), 'yyyy-MM-dd HH:mm:ss.SSS');
  return formattedDates;
}

export function formatDateAndTimeList(dateList:string[]):string[] {
  const formattedDates = dateList.map(date => 
    format(parseISO(date), 'yyyy-MM-dd HH:mm:ss')
  );
  return formattedDates;
}