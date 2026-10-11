export type OfficialAnswer = {title:string; steps:string[]; source:string; sourceTitle:string; checked:string};
export function getOfficialAnswer(query:string):OfficialAnswer|null {
  const checked='2026-10-11';
  if (/VPN|数据库|文献/i.test(query) || (/校外|在家/.test(query) && /图书馆|资源/.test(query))) return {
    title:'校外访问图书馆数字资源',
    steps:['打开图书馆“校外访问”官方指南。','按指南选择 WEBVPN；在校方页面使用统一身份认证账号登录。','进入图书馆数字资源页面检索文献；具体资源权限以校方系统为准。'],
    source:'https://lib.cdut.edu.cn/fw/wxfw/xwfw.htm',sourceTitle:'图书馆 · 校外访问指南',checked,
  };
  if (/在读证明|成绩单|电子证明|学历证明|学位证明/.test(query)) return {
    title:'证明申请应通过校方办理',
    steps:['进入教务处官网的“办事指南”栏目。','在读证明等本科事项先查看“本科生可信电子证明申请操作指引”；学历、学位证明按对应事项选择指南。','按最新官方指引登录校方系统、提交材料。本助手无法代办或查询审核状态。'],
    source:'https://aao.cdut.edu.cn/',sourceTitle:'教务处 · 办事指南',checked,
  };
  if (/奖学金|助学金|资助/.test(query)) return {
    title:'奖助学金与资助信息',steps:['进入学校学生处官网查看当期资助通知。','核对对应项目的资格、材料与截止时间；不能用往年通知替代当期要求。','需要申请时，从学校学生服务页选择奖学金申请入口。'],
    source:'https://xsc.cdut.edu.cn/',sourceTitle:'学生处 · 资助相关通知',checked,
  };
  if (/心理|咨询预约/.test(query)) return {
    title:'心理咨询官方入口',steps:['打开学校学生服务页。','在“学生事务”中选择心理咨询预约。','在学校网站按提示办理；本页不会保存咨询内容或读取预约结果。'],
    source:'https://www.cdut.edu.cn/xs.htm',sourceTitle:'学校官网 · 学生服务',checked,
  };
  if (/校历|放假|开学|作息/.test(query)) return {
    title:'查看校历和作息',steps:['进入学校教务处官网。','打开校历作息栏目，并选择当前学年的教学日历。','核对学年与日期；本站活动日历中的演示日期不代表学校安排。'],source:'https://aao.cdut.edu.cn/',sourceTitle:'教务处 · 校历作息',checked,
  };
  return null;
}
