import { TRouteItemsPath, TSidebarItem } from '@/types';


export const sidebarItemsGenerator = (items: TRouteItemsPath[]) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
;
      acc.push({
        icon: item.icon,
        title: item.name,
        url: item.path,
        isActive: false,
      });
    }
    if (item.children) {
      acc.push({
        icon: item.icon,
        url: item.path || '#',
        isActive: false,
        title: item.name,
        items: item.children.map((child) => {
          if (child.name) {
            return {
              title: child.name,
              url: child.path ?? '#',
              isActive: false,
            }
          }
        }),
      });
    }
    console.log(acc);
    return acc;
  }, []);
  return sidebarItems;
};
