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

function setStatus(message) {
    document.getElementById("status").innerText =
        message;
}

function saveToken() {

    const token =
        document.getElementById("githubToken").value;

    localStorage.setItem(
        "resumeLabGithubToken",
        token
    );

    setStatus(
        "GitHub token saved."
    );
}

function getToken() {

    return localStorage.getItem(
        "resumeLabGithubToken"
    );
}

async function getResumeFileInfo() {

    const token = getToken();

    const response =
        await fetch(
            "https://api.github.com/repos/sap586/resume-lab/contents/docs/data/master-resume.json",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    return await response.json();
}

async function saveResumeToGithub() {

    const token = getToken();

    const file =
        await getResumeFileInfo();

    const content =
        btoa(
            unescape(
                encodeURIComponent(
                    JSON.stringify(
                        masterData,
                        null,
                        2
                    )
                )
            )
        );

    const response =
        await fetch(
            "https://api.github.com/repos/sap586/resume-lab/contents/docs/data/master-resume.json",
            {
                method: "PUT",

                headers: {
                    Authorization:
                        `Bearer ${token}`,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    message:
                        "Update resume from Resume CMS",

                    content,

                    sha: file.sha
                })
            }
        );

    return await response.json();
}

async function triggerBuild() {

    const token = getToken();

    await fetch(
        "https://api.github.com/repos/sap586/resume-lab/actions/workflows/build-from-json.yml/dispatches",
        {
            method: "POST",

            headers: {
                Authorization:
                    `Bearer ${token}`,

                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                ref: "main"
            })
        }
    );
}

async function generatePdf() {

    try {

        setStatus(
            "Saving resume..."
        );

        await saveResumeToGithub();

        setStatus(
            "Starting GitHub build..."
        );

        await triggerBuild();

        setStatus(
            "Build started. Wait about a minute, then open the PDF."
        );

    }
    catch(error) {

        console.error(error);

        setStatus(
            "Build failed."
        );
    }
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
