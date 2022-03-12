// 该js文件用于生成两个小于100的随机数并返回
function randNum() {
  const num1 = Math.floor(Math.random() * 100);
  const num2 = Math.floor(Math.random() * 100);
  return [num1, num2];
}
export default randNum;
