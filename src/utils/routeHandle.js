/**
 * 递归获取所有二级叶子路由
 */
export function getRouteLeafs(menu) {
  const set = new Map();
  if (!menu) {
    return set;
  }

  for (const item of menu) {
    const items = [];
    // 二级路由
    if (item.childMenu) {
      for (const childItem of item.childMenu) {
        if (childItem.url) {
          items.push(childItem);
        }
      }
    }

    if (items.length) {
      items.forEach((i) => set.set(i.url, i));
    } else {
      set.set(item.url, item);
    }

    // 针对微商城营销特殊处理
    // if (item.identifier === 'ma_marketing') {
    //   set.set(item.url, item);
    // }
  }
  return set;
}
