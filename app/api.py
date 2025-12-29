from fastapi import FastAPI, UploadFile, File, Query
from pathlib import Path
from .ingestion.parser import extract_text
from .ingestion.chunker import chunk_text

# Directory to store uploaded files
UPLOAD_DIR = Path("data/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="AI Document Ingestion API")


def summarize_file(file_path: Path, max_chunks=5) -> str:
    """
    Extracts text, chunks it, and returns a formatted multi-chunk summary.
    """
    text = extract_text(file_path)
    chunks = chunk_text(text)
    
    # Take first `max_chunks` chunks
    selected_chunks = chunks[:max_chunks]
    
    # Join chunks into a readable paragraph-separated summary
    summary = "\n\n".join(selected_chunks)
    return summary


def generate_short_summary(file_path: Path, max_sentences=3) -> str:
    """
    Extracts text from the file and returns a short summary
    containing `max_sentences` sentences.
    """
    text = extract_text(file_path)
    chunks = chunk_text(text)
    
    # Combine all chunks
    full_text = " ".join(chunks)
    
    # Split into sentences
    sentences = full_text.split(". ")
    
    # Take first `max_sentences` sentences
    summary = ". ".join(sentences[:max_sentences])
    if not summary.endswith("."):
        summary += "."
    
    return summary


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a file and return its detailed multi-chunk summary
    and short summary.
    """
    file_path = UPLOAD_DIR / file.filename

    # Save uploaded file
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Generate summaries
    detailed_summary = summarize_file(file_path, max_chunks=5)
    short_summary = generate_short_summary(file_path, max_sentences=3)

    return {
        "file": file.filename,
        
        "short_summary": short_summary
    }


@app.get("/summarize")
async def summarize_docs(keyword: str = Query(..., description="Keyword to filter files")):
    """
    Search files by keyword in filename and return their summaries.
    """
    summaries = []

    for file_path in UPLOAD_DIR.iterdir():
        if keyword.lower() in file_path.name.lower():
            try:
                detailed_summary = summarize_file(file_path, max_chunks=5)
                short_summary = generate_short_summary(file_path, max_sentences=3)
                summaries.append({
                    "file": file_path.name,
                    
                    "short_summary": short_summary
                })
            except Exception as e:
                summaries.append({
                    "file": file_path.name,
                    "error": str(e)
                })

    if not summaries:
        return {"message": f"No files found with keyword '{keyword}'."}

    return {"keyword": keyword, "summaries": summaries}
