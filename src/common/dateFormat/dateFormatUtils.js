function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString(),          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
    "年": date.getFullYear().toString() + "年",        // 年
    "月": (date.getMonth() + 1).toString() + "月",     // 月
    "日": date.getDate().toString() + "日",            // 日
    "时": date.getHours().toString() + "时",           // 时
    "分": date.getMinutes().toString() + "分",         // 分
    "秒": date.getSeconds().toString() + "秒"         // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    }
  }
  return fmt;
}

export default {
  dateFormat
}
