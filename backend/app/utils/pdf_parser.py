from pypdf import PdfReader
from docx import Document
import io

def parse_pdf(file_bytes: bytes) -> str:
    """Extract text from PDF file"""
    try:
        pdf_file = io.BytesIO(file_bytes)
        reader = PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        return f"Error parsing PDF: {str(e)}"

def parse_docx(file_bytes: bytes) -> str:
    """Extract text from DOCX file"""
    try:
        doc_file = io.BytesIO(file_bytes)
        doc = Document(doc_file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        return f"Error parsing DOCX: {str(e)}"

def parse_resume(file_bytes: bytes, filename: str) -> str:
    """Parse resume based on file type"""
    if filename.endswith('.pdf'):
        return parse_pdf(file_bytes)
    elif filename.endswith('.docx'):
        return parse_docx(file_bytes)
    elif filename.endswith('.txt'):
        return file_bytes.decode('utf-8')
    else:
        return "Unsupported file format"