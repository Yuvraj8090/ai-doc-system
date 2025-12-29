from pathlib import Path

SUPPORTED_EXTENSIONS = [".pdf", ".docx", ".txt"]

def load_files(directory: str):
    path = Path(directory)
    path.mkdir(parents=True, exist_ok=True)

    return [
        file for file in path.iterdir()
        if file.suffix.lower() in SUPPORTED_EXTENSIONS
    ]
