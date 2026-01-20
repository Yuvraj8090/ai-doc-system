from ingestion.loader import load_files
from ingestion.parser import extract_text
from ingestion.chunker import chunk_text
from ingestion.metadata import build_metadata

UPLOAD_DIR = "data/uploads"

def run_ingestion():
    files = load_files(UPLOAD_DIR)

    for file in files:
        text = extract_text(file)
        chunks = chunk_text(text)

        for idx, chunk in enumerate(chunks):
            meta = build_metadata(file, idx)
            print("Chunk:", chunk[:80])
            print("Meta:", meta)
            print("-" * 50)

if __name__ == "__main__":
    run_ingestion()
