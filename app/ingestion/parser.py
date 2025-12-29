from pathlib import Path
import fitz  # PyMuPDF
from docx import Document

# Optional: only import textract if you need to handle old .doc files
try:
    import textract
    TEXTRACT_AVAILABLE = True
except ImportError:
    TEXTRACT_AVAILABLE = False
    print("[INFO] textract not installed. .doc files will not be supported.")


def parse_pdf(file_path: Path) -> str:
    """Extract text from PDF using PyMuPDF"""
    try:
        text = ""
        with fitz.open(file_path) as doc:
            for page in doc:
                text += page.get_text()
        return text
    except Exception as e:
        print(f"[ERROR] Failed to read PDF {file_path.name}: {e}")
        return ""


def parse_docx(file_path: Path) -> str:
    """Extract text from DOCX using python-docx"""
    try:
        doc = Document(file_path)
        return "\n".join(p.text for p in doc.paragraphs)
    except Exception as e:
        print(f"[ERROR] Failed to read DOCX {file_path.name}: {e}")
        return ""


def parse_doc(file_path: Path) -> str:
    """Extract text from older DOC files using textract"""
    if not TEXTRACT_AVAILABLE:
        print(f"[WARNING] textract not installed. Cannot read {file_path.name}")
        return ""
    try:
        text = textract.process(str(file_path))
        return text.decode("utf-8")
    except Exception as e:
        print(f"[ERROR] Failed to read DOC {file_path.name}: {e}")
        return ""


def parse_txt(file_path: Path) -> str:
    """Read text from plain TXT file"""
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception as e:
        print(f"[ERROR] Failed to read TXT {file_path.name}: {e}")
        return ""


def extract_text(file_path: Path) -> str:
    """
    Unified text extraction function for .txt, .pdf, .doc, .docx
    """
    suffix = file_path.suffix.lower()
    
    if suffix == ".pdf":
        return parse_pdf(file_path)
    elif suffix == ".docx":
        return parse_docx(file_path)
    elif suffix == ".doc":
        return parse_doc(file_path)
    elif suffix == ".txt":
        return parse_txt(file_path)
    else:
        print(f"[WARNING] Unsupported file type: {suffix}")
        return ""
