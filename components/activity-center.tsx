"use client";

import { useState } from "react";
import { MonthCalendar } from "./month-calendar";
import { getCapacityStatus } from "../lib/campus-data";

const groups = [
  { name: "年度大型活动", items: [["百团大战", "9月", "求真广场百余社团招新", 86], ["迎新游园会", "9月", "闯关集章与志愿服务", 62], ["校运会", "4月", "西区体育场全校开放", 48], ["砚湖之韵校园文化艺术节", "4–5月", "歌手、舞蹈与书画摄影活动", 73], ["毕业季系列活动", "6月", "晚会、市集与旧物交换", 35]] },
  { name: "科创与学科", items: [["挑战杯", "全年关注", "支持跨专业组队", 81], ["数学建模竞赛", "按通知", "面向全校自由组队", 58], ["英语竞赛 NECCS", "按通知", "全校可报名", 41], ["创新创业大赛", "按通知", "所有学生可组队", 67], ["校级讲座", "常态开展", "考研、留学、职业规划与人文科普", 37]] },
  { name: "节日、体育与志愿", items: [["中秋/端午游园会", "节日期间", "投壶、手工 DIY 与猜灯谜", 66], ["跨年与春日活动", "元旦/春季", "跨年晚会、元旦游园与春日踏青", 52], ["读书月", "4月", "读书分享、征文与书籍漂流", 44], ["心理健康月", "3月/5月", "心理沙龙、手工、观影与解压", 70], ["理工杯与校园联赛", "学期内", "足球、篮球、排球、羽毛球和乒乓球赛", 76], ["荧光夜跑与环湖跑", "学期内", "全校开放跑步活动", 78], ["体育训练营", "常态开展", "瑜伽、健身与轮滑等", 36], ["三下乡暑期社会实践", "暑期", "组队调研与志愿服务", 65], ["校园志愿", "常态招募", "迎新、博物馆讲解与图书整理", 54], ["社区与环保公益", "不定期", "社区志愿与环保服务", 31], ["社团常规活动", "常态开展", "辩论、吉他、摄影、桌游、书法等", 29], ["主持、演讲与征文比赛", "学期内", "全校学生均可参与", 56], ["宿舍文化节", "学期内", "宿舍装扮与趣味赛", 47], ["美食节与校园市集", "不定期", "校园生活主题活动", 83]] },
] as const;

export function ActivityCenter() {
  const [filter, setFilter] = useState("全部");
  const visible = filter === "全部" ? groups : groups.filter((group) => group.name === filter);
  return <><div className="title"><div><label>全校学生均可参加 · 演示数据</label><h1>校园活动</h1><p>活动时间和报名方式请以学校当期通知为准。</p></div></div><MonthCalendar/><h2 className="section-title">年度活动参考 · 演示</h2><div className="event-tabs"><button className={filter === "全部" ? "on" : ""} onClick={() => setFilter("全部")}>全部活动</button>{groups.map((group) => <button className={filter === group.name ? "on" : ""} key={group.name} onClick={() => setFilter(group.name)}>{group.name}</button>)}</div><section className="event-groups">{visible.map((group) => <article className="event-group" key={group.name}><header><i/><h2>{group.name}</h2><span>{group.items.length} 项</span></header><div>{group.items.map(([title, time, description, capacity]) => { const status = getCapacityStatus(capacity); return <section className="activity-item" key={title}><time>{time}</time><h3>{title}</h3><p>{description}</p><div className="activity-capacity"><span>演示报名人数：{capacity}/100 人</span><b className={status.color}>{status.label}</b><i><em className={status.color} style={{ width: `${capacity}%` }}/></i></div></section>; })}</div></article>)}</section></>;
}
