/**
 * 递归获取所有二级叶子路由
 */
export function getRouteLeafs(menu: any) {
  const set = new Map();
  if (!menu) {
    return set;
  }
  menu.forEach((j: any) => {
    const items = [];
    for (const item of j.childMenu) {
      // 3级路由 商品列表、组合商品等
      if (item.childMenu) {
        for (const childItem of item.childMenu) {
          if (childItem.url) {
            items.push(childItem);
          }
        }
      }

      if (items.length) {
        // items.forEach((i) => set.set(i.url, i));
        items.forEach((i) => set.set(j.url + i.url, i));
      } else {
        // set.set(item.url, item);
        set.set(j.url + item.url, item);
      }

      // 针对微商城营销特殊处理
      // if (item.identifier === 'ma_marketing') {
      //   set.set(item.url, item);
      // }
    }
  });

  return set;
}
