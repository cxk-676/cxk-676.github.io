export type AgentSceneId = "study" | "lunch" | "library" | "unknown";

export type AgentScene = {
  id: AgentSceneId;
  request: string;
  result: string;
  details: string;
  skills: { id: string; name: string; purpose: string; params: string }[];
};

export const agentScenes: Record<AgentSceneId, AgentScene> = {
  study: {
    id: "study",
    request: "今晚找一个安静的教室自习",
    result: "为你找到东区教学楼 E1A101",
    details: "1 楼 · 可容纳 62 人 · 晚间 19:00–21:00 · 演示数据",
    skills: [
      { id: "room-search", name: "查询空教室", purpose: "筛选模拟可用教室", params: "东1 / 19:00–21:00" },
      { id: "campus-route", name: "校园导航", purpose: "生成示意路线", params: "当前位置 → E1A101" },
    ],
  },
  lunch: {
    id: "lunch",
    request: "中午吃什么，尽量避开人流",
    result: "推荐芙蓉食堂的番茄牛腩面",
    details: "当前拥挤度 32% · ¥12 · 建议 11:15 前出发 · 演示数据",
    skills: [
      { id: "dining-crowd", name: "食堂避峰", purpose: "比较模拟拥挤度", params: "午餐时段" },
      { id: "food-match", name: "美食推荐", purpose: "按预算筛选菜品", params: "预算 ≤ ¥20" },
      { id: "campus-route", name: "校园导航", purpose: "生成示意路线", params: "当前位置 → 芙蓉食堂" },
    ],
  },
  library: {
    id: "library",
    request: "预约东区图书馆今晚的座位",
    result: "东区图书馆二楼仍有 33 个可选座位",
    details: "请选择座位后确认；模拟预约不会占用真实资源。",
    skills: [
      { id: "library-seat", name: "图书馆预约", purpose: "查询模拟空座", params: "二楼安静区 / 19:00–21:00" },
    ],
  },
  unknown: {
    id: "unknown",
    request: "未匹配到明确服务",
    result: "我暂时无法识别这项需求",
    details: "你可以试试：找自习教室、午餐避峰或预约图书馆座位。",
    skills: [],
  },
};

export function resolveAgentScene(input: string): AgentScene {
  if (input in agentScenes) return agentScenes[input as AgentSceneId];
  if (/教室|自习|学习空间/.test(input)) return agentScenes.study;
  if (/食堂|午餐|吃什么|避峰|美食/.test(input)) return agentScenes.lunch;
  if (/图书馆|座位|预约/.test(input)) return agentScenes.library;
  return agentScenes.unknown;
}
