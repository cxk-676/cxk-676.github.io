"use client";
import {useState} from 'react';
import {calendarDays} from '../lib/portal-state';
import {getCapacityStatus} from '../lib/campus-data';
const themes:Record<number,string[]>= {3:['心理健康月'],4:['校运会','读书月','砚湖之韵'],5:['心理健康节','砚湖之韵'],6:['毕业季市集'],7:['三下乡交流'],8:['暑期实践分享'],9:['百团大战','迎新游园会'],12:['跨年晚会']};
export function MonthCalendar(){
 const [date,setDate]=useState(()=>new Date());const [selected,setSelected]=useState<number|null>(null);const [mode,setMode]=useState('demo');
 const year=date.getFullYear(),month=date.getMonth()+1;
 const events=(themes[month]||['社团交流','读书分享','校园志愿']).map((name,index)=>({name,day:[8,15,22][index],count:[86,62,35][index]}));
 const visible=selected===null?events:events.filter(event=>event.day===selected);
 const move=(delta:number)=>{setDate(new Date(year,month-1+delta,1));setSelected(null);};
 return <section className="monthly-calendar"><div className="directory-tabs"><button aria-pressed={mode==='demo'} onClick={()=>setMode('demo')}>演示活动日历</button><button aria-pressed={mode==='official'} onClick={()=>setMode('official')}>官方通知入口</button></div>
 {mode==='official'?<div className="official-notices"><h2>以当期官方通知为准</h2><p>本页不将未核实通知编入日历，不提供真实报名人数。</p><a href="https://www.cdut.edu.cn/" target="_blank" rel="noopener noreferrer">学校官网新闻与通知 ↗</a><a href="https://lib.cdut.edu.cn/index/tzgg.htm" target="_blank" rel="noopener noreferrer">图书馆通知公告 ↗</a><a href="https://xsc.cdut.edu.cn/" target="_blank" rel="noopener noreferrer">学生处活动与学工通知 ↗</a></div>:<><header className="month-header"><button aria-label="上个月" onClick={()=>move(-1)}>‹</button><h2>{year} 年 {month} 月</h2><button aria-label="下个月" onClick={()=>move(1)}>›</button><button onClick={()=>{setDate(new Date());setSelected(null);}}>本月</button></header><p className="source-note">以下日期、地点及报名人数为演示；不代表真实活动安排。</p><div className="month-days">{['日','一','二','三','四','五','六'].map(day=><span className="weekday" key={day}>{day}</span>)}{calendarDays(year,month).map((day,index)=>day===null?<span key={`blank-${index}`}/>:<button key={day} aria-pressed={selected===day} aria-label={`${month}月${day}日${events.some(event=>event.day===day)?'有演示活动':''}`} onClick={()=>setSelected(day)}><b>{day}</b>{events.some(event=>event.day===day)&&<i/>}</button>)}</div><div className="month-selection"><b>{selected===null?'本月演示活动':`${month} 月 ${selected} 日`}</b>{selected!==null&&<button onClick={()=>setSelected(null)}>查看整月</button>}</div><div className="month-events">{visible.map(event=>{const status=getCapacityStatus(event.count);return <article key={event.name}><label>演示 · {month}/{event.day}</label><h3>{event.name}</h3><p>面向全校学生 · 活动地点为演示信息</p><small>演示报名人数：{event.count}/100 人</small><div className={`capacity-track ${status.color}`}><i style={{width:event.count+'%'}}/></div></article>})}{!visible.length&&<p className="empty">当天没有演示活动。可切换日期或查看官方通知。</p>}</div></>}
 </section>;
}
