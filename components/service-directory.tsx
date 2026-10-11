"use client";
import { useState } from 'react';
import { officialServices } from '../lib/campus-services';

export function ServiceDirectory() {
  const [category, setCategory] = useState('全部');
  return <section className="directory-section">
    <div className="directory-heading"><div><label>OFFICIAL SERVICES</label><h2>校园服务，一站直达</h2><p>连接学校公开网站，具体办理要求与最新信息以校方页面为准。</p></div><span className="official-badge">官方入口</span></div>
    <div className="directory-tabs" aria-label="服务分类">{['全部','学习','生活','办事','成长'].map(value => <button key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{value}</button>)}</div>
    <div className="directory-grid">{officialServices.filter(item=>category==='全部'||item.category===category).map(item=><a className="official-card" key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"><i aria-hidden="true">{item.icon}</i><span className="official-badge">官方</span><h3>{item.name}</h3><p>{item.description}</p><small>{new URL(item.url).hostname} <span aria-hidden="true">↗</span></small></a>)}</div>
    <p className="source-note">部分服务需在校方网站登录或使用校园网络；本页不收集校内账号密码。</p>
  </section>;
}
