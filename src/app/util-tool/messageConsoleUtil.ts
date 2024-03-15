
export function consoleLog (source:string, message:any ){
    // 检查message是否是对象，并且不是null
  if (typeof message === 'object' && message !== null) {
    console.log(`${source} : ${JSON.stringify(message, null, 2)}`);
  } else {
    console.log(`${source} : ${message}`);
  }
  }

  export function consoleError(source:string, message:any ){
    try {
      // 检查message是否是对象，并且不是null
      if (typeof message === 'object' && message !== null) {
        console.error(`${source} : ${JSON.stringify(message, null, 2)}`);
      } else {
        // 如果message不是一个对象或者是null，直接打印出来
        console.error(`${source} : ${message}`);
      }
    } catch (error) {
      // 如果JSON.stringify失败了，打印错误信息
      console.error(`${source} : <failed to stringify message>`, message);
    }
  }