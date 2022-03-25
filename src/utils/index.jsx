/*
  批量删除  数组过滤
 */
function filterArr(arr1, arr2, key = "id") {
  /*
        arr1[{id:1},{id:2}]
        arr2[{id:1}]
        return : [{id:2}]
    */
  const newData = [];
  for (let i = 0; i < arr1.length; i++) {
    let item = arr1[i];
    let isExist = false;
    for (let j = 0; j < arr2.length; j++) {
      var key1 = arr2[j][key];
      if (item[key] === key1) {
        isExist = true;
        break;
      }
    }
    if (!isExist) {
      newData.push(item);
    }
  }
  return newData;
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { filterArr };
