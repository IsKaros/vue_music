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

export function getArtist(arr) {
  var artistName = ''
  arr.forEach((item, index) => {
    if (index !== 0) {
      artistName += '/'
    }
    artistName += item.name
  })
  return artistName
}
export function get_cookie(Name) {
  var search = Name + "="//查询检索的值
  var returnvalue = "";//返回值
  if (document.cookie.length > 0) {
  var  sd = document.cookie.indexOf(search);
    if (sd!= -1) {
      sd += search.length;
    var end = document.cookie.indexOf(";", sd);
      if (end == -1)
        end = document.cookie.length;
      //unescape() 函数可对通过 escape() 编码的字符串进行解码。
      returnvalue=decodeURI(document.cookie.substring(sd, end))
    }
  }
  console.log(returnvalue)
  return returnvalue;
}
export function getCookie(name){
  var cookieArray=document.cookie.split("; "); //得到分割的cookie名值对
  var cookie=new Object();
  for (var i=0;i<cookieArray.length;i++){
    var arr=cookieArray[i].split("=");       //将名和值分开
    if(arr[0]==name)return unescape(arr[1]); //如果是指定的cookie，则返回它的值
  }
  return "";
}