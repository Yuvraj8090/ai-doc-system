from datetime import datetime

def build_metadata(file_path, chunk_id):
    return {
        "file_name": file_path.name,
        "file_type": file_path.suffix,
        "chunk_id": chunk_id,
        "uploaded_at": datetime.utcnow().isoformat()
    }
