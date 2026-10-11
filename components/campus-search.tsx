"use client";
import { useState } from 'react';
import { addRecentSearch, readLocalList } from '../lib/portal-state';
import { Search } from 'lucide-react';
import { buildSearchUrl, findOfficialServices, type SearchScope } from '../lib/campus-services';

export function CampusSearch({onNavigate}: {onNavigate:(view:string)=>void}) {
  const [query,setQuery]=useState('');
  const [history,setHistory]=useState<string[]>(()=>readLocalList('cdut-search-history'));
  const [scope,setScope]=useState<SearchScope>('site');
  const [submitted,setSubmitted]=useState(false);
  const local=[{name:'校园活动',view:'events'},{name:'空教室',view:'classroom'},{name:'图书馆预约',view:'library'},{name:'食堂美食',view:'dining'},{name:'校园地图导航',view:'map'},{name:'失物招领',view:'lost'},{name:'服务大厅',view:'service'},{name:'我的预约',view:'mine'}].filter(item=>query.trim()&&item.name.includes(query.trim()));
  const results=query.trim()?findOfficialServices(query):[];
  return <div className="search-hub"><form onSubmit={event=>{event.preventDefault();setSubmitted(true);if(query.trim()){const next=addRecentSearch(history,query);setHistory(next);localStorage.setItem('cdut-search-history',JSON.stringify(next));}const url=buildSearchUrl(query,scope);if(url)window.open(url,'_blank','noopener,noreferrer');}}><Search size={18}/><select aria-label="搜索范围" value={scope} onChange={event=>{setScope(event.target.value as SearchScope);setSubmitted(false);}}><option value="site">站内服务</option><option value="campus">学校官网</option><option value="web">全网搜索</option></select><input aria-label="搜索关键词" value={query} onChange={event=>{setQuery(event.target.value);setSubmitted(false);}} placeholder="搜索服务，或查询真实网络信息"/><button type="submit">搜索 ↗</button></form><small>{scope==='site'?'查找本站功能与官方入口':scope==='campus'?'使用百度检索学校域名 cdut.edu.cn，结果在新标签页打开':'使用百度查询真实网络信息，结果在新标签页打开'}</small>
  {scope==='site'&&query.trim()&&<section className="search-results" aria-live="polite">{local.map(item=><button key={item.view} onClick={()=>{onNavigate(item.view);setQuery('');}}>{item.name}<small>站内功能 →</small></button>)}{results.map(item=><a href={item.url} target="_blank" rel="noopener noreferrer" key={item.name}>{item.name}<small>官方入口 ↗</small></a>)}{!local.length&&!results.length&&<p>没有匹配服务。选择“学校官网”或“全网搜索”继续查询。</p>}</section>}
  {!query&&history.length>0&&<div className="recent-searches"><span>最近搜索</span>{history.map(item=><button key={item} onClick={()=>setQuery(item)}>{item}</button>)}<button onClick={()=>{setHistory([]);localStorage.removeItem('cdut-search-history');}}>清空</button></div>}
  {submitted&&!query.trim()&&<p role="status">请先输入搜索关键词。</p>}
  </div>;
}
