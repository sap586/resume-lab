import json
from pathlib import Path
from jinja2 import Environment, FileSystemLoader
root=Path(__file__).parent.parent
data=json.loads((root/"data/resume.json").read_text())
env=Environment(loader=FileSystemLoader(root/"templates"))
t=env.get_template(f"{data['resumeType']}.tex.j2")
out=t.render(**data)
(root/"generated").mkdir(exist_ok=True)
(root/"generated/resume.tex").write_text(out,encoding="utf-8")
print("generated")