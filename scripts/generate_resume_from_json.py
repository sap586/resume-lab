import json
import sys
from pathlib import Path

from jinja2 import Environment, FileSystemLoader


ROOT = Path(__file__).resolve().parent.parent
RESUME_TYPES = ("software", "robotics", "architect", "management")


def latex_escape(value):
    replacements = {
        "\\": r"\textbackslash{}",
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    return "".join(replacements.get(character, character) for character in str(value))


def build_resume(master, resume_type):
    resume = dict(master)
    resume["experience"] = []
    for job in master.get("experience", []):
        filtered_bullets = [
            bullet for bullet in job.get("bullets", [])
            if resume_type in bullet.get("tags", [])
        ]
        if filtered_bullets:
            filtered_job = dict(job)
            filtered_job["bullets"] = filtered_bullets
            resume["experience"].append(filtered_job)
    return resume


def generate(resume_type):
    master_path = ROOT / "data" / "master-resume.json"
    master = json.loads(master_path.read_text(encoding="utf-8"))
    environment = Environment(
        loader=FileSystemLoader(ROOT / "templates"),
        autoescape=False,
    )
    environment.filters["latex"] = latex_escape
    template = environment.get_template("resume.tex.j2")
    resume = build_resume(master, resume_type)
    output = template.render(**resume)
    output_path = ROOT / "generated" / f"{resume_type}.tex"
    output_path.parent.mkdir(exist_ok=True)
    output_path.write_text(output, encoding="utf-8")
    print(f"generated {output_path}")


def main():
    requested_types = sys.argv[1:] or list(RESUME_TYPES)
    invalid_types = set(requested_types) - set(RESUME_TYPES)
    if invalid_types:
        raise SystemExit(f"Unknown resume type: {', '.join(sorted(invalid_types))}")
    for resume_type in requested_types:
        generate(resume_type)


if __name__ == "__main__":
    main()