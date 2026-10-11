import { readFileSync,writeFileSync,copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
const dir=resolve('.pages-build');
let html=readFileSync(resolve(dir,'index.html'),'utf8');
html=html.replace(/<script[^>]+src="([^"]+)"[^>]*><\/script>/g,(_,path)=>'<script type="module">'+readFileSync(resolve(dir,path),'utf8').replace(/<\/script/gi,'<\\/script')+'</script>');
html=html.replace(/<link[^>]+href="([^"]+\.css)"[^>]*>/g,(_,path)=>'<style>'+readFileSync(resolve(dir,path),'utf8')+'</style>');
writeFileSync('github-pages/index.html',html);
copyFileSync('github-pages/cdut-campus-map-mobile.jpg','.pages-build/cdut-campus-map-mobile.jpg');
console.log('GitHub Pages now renders the same React source as local development.');
