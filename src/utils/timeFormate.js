/**
 * 该 js 文件用于处理时间格式
 * @param {Number}
 * @returns {data}
 */
function timeFormate(num) {
  // console.log(num);
  const date = new Date(num * 1000);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
}

export default timeFormate;
