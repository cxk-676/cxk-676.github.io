export type CapacityColor = "green" | "yellow" | "red";

export type CapacityStatus = {
  color: CapacityColor;
  label: "余量充足" | "报名中" | "即将满额";
};

export type LostItem = {
  id: string;
  title: string;
  place: string;
  isSeed?: boolean;
  kind?: "招领" | "寻物";
  date?: string;
  detail?: string;
};

export const DEMO_DATA_LABEL = "演示数据";

export function getCapacityStatus(value: number): CapacityStatus {
  if (value >= 80) return { color: "red", label: "即将满额" };
  if (value >= 50) return { color: "yellow", label: "报名中" };
  return { color: "green", label: "余量充足" };
}

export function migrateLostItems(items: LostItem[]): LostItem[] {
  return items.map((item) =>
    (item.isSeed || item.id === "1" || item.id === "seed-thermos") && item.title === "黑色保温杯"
      ? { ...item, place: "东区教学楼 E1A 一楼" }
      : item,
  );
}

export const baseLostItems: LostItem[] = [
  {
    id: "seed-thermos",
    title: "黑色保温杯",
    place: "东区教学楼 E1A 一楼",
    isSeed: true,
    kind: "招领",
    date: "今天 12:20",
    detail: "杯身贴有蓝色星球贴纸。",
  },
  {
    id: "seed-campus-card",
    title: "校园卡",
    place: "银杏餐厅二楼",
    isSeed: true,
    kind: "寻物",
    date: "昨天 18:40",
    detail: "姓名首字母为 L。",
  },
  {
    id: "seed-earbuds",
    title: "白色耳机盒",
    place: "东区图书馆一楼自习区",
    isSeed: true,
    kind: "招领",
    date: "昨天 14:05",
    detail: "请凭耳机型号认领。",
  },
];
