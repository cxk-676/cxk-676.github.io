"use client";
import {useState,useRef} from 'react';

const places=[
 {name:'东1教学楼 E1',x:61,y:14}, {name:'东2教学楼 E2',x:67,y:17},
 {name:'东区图书馆',x:69,y:29}, {name:'银杏餐厅',x:34,y:78},
 {name:'芙蓉食堂片区',x:57,y:65}, {name:'珙桐餐厅片区',x:55,y:52},
 {name:'香樟片区',x:55,y:26}, {name:'砚湖',x:33,y:48},
 {name:'学校正门',x:14,y:61},
];
export function CampusMap(){
 const [query,setQuery]=useState('');const [selected,setSelected]=useState('东区图书馆');const [scale,setScale]=useState(1);
 const viewport=useRef<HTMLDivElement>(null);const drag=useRef<{x:number;y:number;left:number;top:number}|null>(null);
 const results=places.filter(place=>place.name.toLowerCase().includes(query.trim().toLowerCase()));
 const choose=(name:string)=>{setSelected(name);const place=places.find(item=>item.name===name);if(place&&viewport.current){viewport.current.scrollTo({left:place.x/100*viewport.current.scrollWidth-viewport.current.clientWidth/2,top:place.y/100*viewport.current.scrollHeight-viewport.current.clientHeight/2,behavior:'smooth'});}};
 return <><div className="title"><div><label>官方平面图 · 地点标注为示意</label><h1>校园地图</h1><p>可搜索、放大与拖动。E1 / E2 标注表示教学片区，不能替代具体楼栋定位。</p></div></div><div className="map-toolbar"><input aria-label="搜索校园地点" value={query} onChange={event=>setQuery(event.target.value)} placeholder="搜索 E1、E2、图书馆、餐厅"/><button onClick={()=>setScale(value=>Math.max(1,value-.5))} aria-label="缩小地图">−</button><span>{Math.round(scale*100)}%</span><button onClick={()=>setScale(value=>Math.min(4,value+.5))} aria-label="放大地图">＋</button><button onClick={()=>{setScale(1);setQuery('');viewport.current?.scrollTo(0,0);}}>重置</button></div>
 <div className="map-locations">{results.map(place=><button className={place.name===selected?'on':''} onClick={()=>choose(place.name)} key={place.name}>{place.name}</button>)}{!results.length&&<p>没有找到地点，请尝试 E1、E2 或图书馆。</p>}</div>
 <div className="interactive-map" ref={viewport} tabIndex={0} aria-label="校园地图区域，放大后可拖动或用键盘滚动" onPointerDown={event=>{if(event.pointerType!=='mouse'||(event.target as HTMLElement).closest('button'))return;drag.current={x:event.clientX,y:event.clientY,left:event.currentTarget.scrollLeft,top:event.currentTarget.scrollTop};event.currentTarget.setPointerCapture(event.pointerId);}} onPointerMove={event=>{if(!drag.current)return;event.currentTarget.scrollLeft=drag.current.left-(event.clientX-drag.current.x);event.currentTarget.scrollTop=drag.current.top-(event.clientY-drag.current.y);}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
  <div className="map-canvas" style={{width:`${scale*100}%`}}><img src="/cdut-campus-map-mobile.jpg" alt="成都理工大学官方校园平面图" draggable={false}/>{places.map(place=><button key={place.name} className={`map-pin ${place.name===selected?'selected':''}`} aria-label={`标注 ${place.name}`} style={{left:`${place.x}%`,top:`${place.y}%`}} onClick={()=>setSelected(place.name)}><i/>{place.name===selected&&<span>{place.name}</span>}</button>)}</div>
 </div><p className="source-note">当前选择：{selected}。标注坐标为示意，不提供实时定位或精确路线。手机放大后可单指拖动。</p><a className="map-link" href="/cdut-campus-map-mobile.jpg" target="_blank" rel="noopener noreferrer">打开完整地图图片 ↗</a></>;
}
