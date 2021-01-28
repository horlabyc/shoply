import { Item } from "src/schemas/item.schema";
import { ShoppingListItem } from "src/schemas/shopping-list-item.schema";

export const formatItemResponse = async (items: ShoppingListItem[]): Promise<{category: string; items: Item[]}[]> => {
  const categories: string[] = [];
  items = items.filter(i => !i.isDeleted);
  items.forEach(item => {
    const index = categories.findIndex((cat) => cat.toUpperCase() === item.category.toUpperCase())
    if(index < 0){
      categories.push(item.category)
    }
  });
  const data = [];
  await categories.forEach((category) => {
    data.push({
      category: category,
      items: items.filter((item) => item.category.toUpperCase() === category.toUpperCase())
    })
  });
  return data;
}