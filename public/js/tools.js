export function formateCount(count) {
  if(count === undefined){
    return
  }
  if (count >= 100000000) {
    return `${(count / 100000000).toFixed(1)}亿`
  } else if(count >= 100000 && count < 100000000){
    return `${(count / 10000).toFixed(0)}万`
  } else {
    return `${count.toFixed(0)}`
  }
}

export function deepClone(arg) {
  console.log(arg)
  if(typeof arg !== "object"){
    return arg
  }
  let result = Reflect.getPrototypeOf(arg) === 'Array' ? [] : {}
  for(let key in arg){
    if(arg.hasOwnProperty(key)){
      result[key] = deepClone(arg[key])
    }
  }
  console.log(result)
  return result
}
export function filterDuration(time) {
  let date = new Date(time) // 将时间戳转化成日期
  let template = 'mm:ss'
  let obj = {
    '(m+)': date.getMinutes() + '',
    '(s+)': date.getSeconds() + ''
  }

  for (let key in obj) {
    let reg = new RegExp(key) // 将key 转化为正则表达式
    if (reg.test(template)) { // 用正则表达式尝试当前字符串是否有匹配的字符
      let str = RegExp.$1.length === 1 ? obj[key] : returnDoubleDate(obj[key])
      template = template.replace(reg, str)
    }
  }
  return template
}
export function filterDate(time) {
  let date = new Date(time) // 将时间戳转化成日期
  let template = 'yyyy-MM-dd hh:mm'
  template = template.replace(/y+/g, date.getFullYear())
  let obj = {
    '(M+)': date.getMonth() + 1 + '',// js月份从0计算
    '(d+)': date.getDate() + '',
    '(h+)': date.getHours() + '',
    '(m+)': date.getMinutes() + '',
    '(s+)': date.getSeconds() + ''
  }

  for (let key in obj) {
    let reg = new RegExp(key) // 将key 转化为正则表达式
    if (reg.test(template)) { // 用正则表达式尝试当前字符串是否有匹配的字符
      let str = RegExp.$1.length === 1 ? obj[key] : returnDoubleDate(obj[key])
      template = template.replace(reg, str)
    }
  }
  return template
}

function returnDoubleDate(time) {
  // 7 => 007  17 => 0017
  return ( '00' + time).substr(time.length)
}

export function doubleDuration(time) {
  return ( '00' + time).substr(time.length)
}