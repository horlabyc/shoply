import { Item } from "src/schemas/item.schema";

export const formatItemResponse = async (items: Item[]): Promise<{category: string; items: Item[]}[]> => {
  const categories: string[] = [];
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