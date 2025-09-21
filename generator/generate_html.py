from pathlib import Path
import json

EXPERIENCES = "experiences"
TRAINING = "training"
PROFILE = "skils"

TEMPLATE_INDEX = "templates/template_index.html"
TEMPLATE_EXPERIENCES = "templates/template_" + EXPERIENCES + ".html"
TEMPLATE_TRAINING = "templates/template_" + TRAINING + ".html"
TEMPLATE_PROFILE = "templates/template_" + PROFILE + ".html"

JSON_EXPERIENCES = "json/" + EXPERIENCES + ".json"
JSON_TRAINING = "json/" + TRAINING + ".json"
JSON_PROFILE = "json/" + PROFILE + ".json"

from pathlib import Path
import json

from pathlib import Path
import json

from pathlib import Path
import json

def generate_profile(json_file, output_file):
    """
    Génère un HTML à partir d'un JSON de CV (Compétences, Loisirs, Langues)
    Le HTML est structuré avec <h2> pour sections, <h3> pour sous-sections, <li> pour éléments.
    """
    # Charger le JSON
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    json_content = ""

    for section, content in data.items():

        json_content += f"<h2>{section}</h2>\n"
        json_content += f"<div class=\"separation\"></div>\n"

        if isinstance(content, dict):
            for subsection, subcontent in content.items():
                json_content +=f"\t<h3>{subsection} :</h3>\n"
                if isinstance(subcontent, dict):
                    for subsubsection, subsubcontent in subcontent.items():
                        json_content += f"\t\t<div class=\"title-div\"><h4>{subsubsection}"
                        for subsubsubsection, subsubsubcontent in subsubcontent.items():
                            if subsubsubsection == "icon_class":
                               json_content += f"</h4><div class=\"{subsubsubcontent}\"></div></div>\n"
                            else:
                                json_content += f"\t\t\t<p>\n"
                                for subsubsubsubcontent in subsubsubcontent:
                                    json_content += f"\t\t\t\t<li>{subsubsubsubcontent}</li>\n"
                                json_content += f"\t\t\t</p>\n"
                else:
                    json_content += f"\t\t<p>\n"
                    for subsubcontent in subcontent:
                        json_content += f"\t\t\t<li>{subsubcontent}</li>\n"
                    json_content += f"\t\t</p>\n"
        else:
            json_content += f"\t<p>\n"
            for subcontent in content:
                json_content += f"\t\t<li>{subcontent}</li>\n"
            json_content += f"\t</p>\n"

    # Create build folder
    folder = Path("build")
    folder.mkdir(parents=True, exist_ok=True)
    output_file = "build/" + output_file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(json_content)
    print(f"✅ {output_file} is generated from {json_file}")

    return output_file



def generate_cv_content(json_file, template_file, output_file):

    # Charger les données
    with open(json_file, "r", encoding="utf-8") as f:
        jobs = json.load(f)

    # Charger le template d'une tuile
    with open(template_file, "r", encoding="utf-8") as f:
        template_tile = f.read()

    # Générer toutes les tuiles
    # html_tiles = [template_tile.format(**job) for job in jobs]

    html_tiles = []
    for job in jobs:
        # Pré-traitement : transformer les listes de texte en chaîne unique
        job_prepared = {
            key: (" ".join(value) if isinstance(value, list) else value)
            for key, value in job.items()
        }
        # Formatter avec le template
        html_tiles.append(template_tile.format(**job_prepared))

    # Create build folder
    folder = Path("build")
    folder.mkdir(parents=True, exist_ok=True)
    output_file = "build/" + output_file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(html_tiles))
    print(f"✅ {output_file} is generated from {json_file}")

    return output_file


def inject_into_template(output_file):

    # Generate html from json files
    html_experiences_file = generate_cv_content(JSON_EXPERIENCES, TEMPLATE_EXPERIENCES, EXPERIENCES + ".html")
    html_training_file = generate_cv_content(JSON_TRAINING, TEMPLATE_TRAINING, TRAINING + ".html")
    html_profile_file = generate_profile(JSON_PROFILE, PROFILE + ".html")

    # Load tempalte from html files
    with open(TEMPLATE_INDEX, "r", encoding="utf-8") as f:
        template = f.read()
    final_html = template

    # EXPERIENCES
    with open(html_experiences_file, "r", encoding="utf-8") as f:
        html_experiences = f.read()
    # Insert experiences tiles
    final_html = final_html.replace("<!--PYTHON_INSERT_EXPERIENCES-->", html_experiences)

    # TRAINING
    with open(html_training_file, "r", encoding="utf-8") as f:
        html_training = f.read()
    # Insert training tiles
    final_html = final_html.replace("<!--PYTHON_INSERT_TRAINING-->", html_training)

    # PROFILE
    with open(html_profile_file, "r", encoding="utf-8") as f:
        html_profile = f.read()
    # Insert training tiles
    final_html = final_html.replace("<!--PYTHON_INSERT_SKILS-->", html_profile)

    # Write final html file : 
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(final_html)

    print(f"✅ index.html has been updated : {output_file}")

if __name__ == "__main__":
    inject_into_template("../index.html")
