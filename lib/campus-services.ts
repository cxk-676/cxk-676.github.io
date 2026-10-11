export type SearchScope = 'site' | 'campus' | 'web';
export function buildSearchUrl(query: string, scope: SearchScope): string | null {
  const text = query.trim();
  if (!text || scope === 'site') return null;
  const url = new URL('https://www.baidu.com/s');
  url.searchParams.set('wd', scope === 'campus' ? `site:cdut.edu.cn ${text}` : text);
  return url.href;
}

export const officialServices = [
  {name:'学生服务总入口', category:'办事', icon:'▣', description:'请假、缴费、综合测评等校方服务入口', url:'https://www.cdut.edu.cn/xs.htm', keywords:'请假 缴费 综合测评'},
  {name:'教务与考试', category:'学习', icon:'▦', description:'教学通知、考试安排和本科办事指南', url:'https://aao.cdut.edu.cn/', keywords:'教务 考试 成绩 课表'},
  {name:'图书馆资源', category:'学习', icon:'▤', description:'馆藏、数字资源与读者服务', url:'https://lib.cdut.edu.cn/', keywords:'图书 文献 数据库 阅读'},
  {name:'就业与招聘', category:'成长', icon:'↗', description:'招生就业处发布的就业相关信息', url:'https://zjc.cdut.edu.cn/', keywords:'就业 招聘 实习 招生'},
  {name:'校园网络', category:'生活', icon:'⌘', description:'校园网络、一卡通及信息化服务指南', url:'https://wxc.cdut.edu.cn/', keywords:'校园网 wifi 一卡通 vpn 邮箱'},
  {name:'学生事务与资助', category:'办事', icon:'♡', description:'学生工作、奖助学金和资助相关通知', url:'https://xsc.cdut.edu.cn/', keywords:'奖学金 资助 学工'},
  {name:'校历与作息', category:'学习', icon:'◷', description:'进入教务处查看校历作息栏目', url:'https://aao.cdut.edu.cn/', keywords:'校历 作息 放假 开学'},
  {name:'心理咨询入口', category:'生活', icon:'☼', description:'进入学校学生服务页，选择心理咨询预约', url:'https://www.cdut.edu.cn/xs.htm', keywords:'心理 咨询 健康'},
  {name:'证明与档案', category:'办事', icon:'▧', description:'学历、学位证明及档案查阅申请入口', url:'https://www.cdut.edu.cn/xs.htm', keywords:'证明 学历 学位 档案'},
  {name:'学校新闻与通知', category:'成长', icon:'≡', description:'学校官网发布的新闻与通知公告', url:'https://www.cdut.edu.cn/', keywords:'新闻 通知 讲座 公告'},
  {name:'创新创业', category:'成长', icon:'✦', description:'通过学生服务页进入创新创业平台', url:'https://www.cdut.edu.cn/xs.htm', keywords:'创新 创业 科创 比赛'},
  {name:'学习平台', category:'学习', icon:'⌂', description:'网络教学平台与问渠学堂官方入口', url:'https://www.cdut.edu.cn/xs.htm', keywords:'学习 网络教学 问渠学堂'},
];

export function findOfficialServices(query: string) {
  const text = query.trim().toLowerCase();
  return text ? officialServices.filter(item => `${item.name} ${item.description} ${item.keywords}`.toLowerCase().includes(text)) : officialServices;
}
