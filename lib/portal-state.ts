export function calendarDays(year:number,month:number): (number|null)[] {
  const start = new Date(year,month-1,1).getDay();
  const count = new Date(year,month,0).getDate();
  return [...Array<null>(start).fill(null),...Array.from({length:count},(_,i)=>i+1)];
}
export function addRecentSearch(history:string[],query:string):string[] {
  const q=query.trim();
  return q ? [q,...history.filter(item=>item!==q)].slice(0,8) : history;
}

export function readLocalList(key:string):string[] {
  try { const value:unknown=JSON.parse(localStorage.getItem(key)||'[]'); return Array.isArray(value)?value.filter((item):item is string=>typeof item==='string'):[]; } catch { return []; }
}
