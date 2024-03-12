
export function consoleLog (source:string, message:any ){
    // 检查message是否是对象，并且不是null
  if (typeof message === 'object' && message !== null) {
    console.log(`${source} : ${JSON.stringify(message, null, 2)}`);
  } else {
    console.log(`${source} : ${message}`);
  }
  }

  export function consoleError(source:string, message:any ){
    // 检查message是否是对象，并且不是null
  if (typeof message === 'object' && message !== null) {
    console.error(`${source} : ${JSON.stringify(message, null, 2)}`);
  } else {
    console.error(`${source} : ${message}`);
  }
  }