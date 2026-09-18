let masterData=null;
const TAGS=["software","robotics","architect","management"];

async function init(){
 const r=await fetch('./data/master-resume.json');
 masterData=await r.json();
 render();
}

function updateStats(){
 let bullets=0;
 masterData.experience.forEach(j=>bullets+=j.bullets.length);
 document.getElementById('stats').innerHTML=`Companies: ${masterData.experience.length} | Bullets: ${bullets}`;
}

function render(){
 const jobs=document.getElementById('jobs');
 jobs.innerHTML='';
 masterData.experience.forEach((job,ji)=>{
  const div=document.createElement('div');
  div.className='job';
  let html=`<input type=text value="${job.company}" onchange="masterData.experience[${ji}].company=this.value"><br><input type=text value="${job.title}" onchange="masterData.experience[${ji}].title=this.value"><button onclick="deleteCompany(${ji})">Delete Company</button>`;
  job.bullets.forEach((b,bi)=>{
   html+=`<div class='bullet'><input type=text value="${b.text}" onchange="masterData.experience[${ji}].bullets[${bi}].text=this.value"><div class='tags'>`+
   TAGS.map(t=>`<label><input type='checkbox' ${b.tags.includes(t)?'checked':''} onchange='toggleTag(${ji},${bi},"${t}",this.checked)'>${t}</label>`).join('')+
   `</div><button onclick='deleteBullet(${ji},${bi})'>Delete Bullet</button></div>`;
  });
  html+=`<button onclick='addBullet(${ji})'>Add Bullet</button>`;
  div.innerHTML=html;
  jobs.appendChild(div);
 });
 updateStats();
}

function toggleTag(j,b,t,c){
 let bullet=masterData.experience[j].bullets[b];
 if(c){if(!bullet.tags.includes(t)) bullet.tags.push(t);} else {bullet.tags=bullet.tags.filter(x=>x!==t);}
 render();
}

function addBullet(j){masterData.experience[j].bullets.push({text:'New Bullet',tags:[]});render();}
function deleteBullet(j,b){masterData.experience[j].bullets.splice(b,1);render();}
function addCompany(){masterData.experience.push({company:'New Company',title:'New Position',bullets:[]});render();}
function deleteCompany(i){masterData.experience.splice(i,1);render();}

function downloadCurrentPdf(){
 const type=document.getElementById('resumeType').value;
 window.open('./pdfs/'+type+'.pdf','_blank');
}

init();