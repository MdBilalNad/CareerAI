import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import FormattedResult from '../components/FormattedResult';
import { FiUpload, FiFileText, FiCheckCircle } from 'react-icons/fi';

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const { data, loading, execute } = useApi(api.analyzeResume);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append('file', file);
    else if (text) formData.append('text', text);
    await execute(formData);
  };

  return (
    <div>
      <div className="page-header">
        <h1><div className="header-icon"><FiFileText /></div>Resume Analyzer</h1>
        <p>Upload your resume and receive AI-powered feedback with ATS compatibility scoring.</p>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiUpload /> Upload Resume (PDF, DOCX, TXT)</label>
            <input type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Or Paste Resume Content</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your resume content here..." rows="10" />
          </div>
          <button type="submit" className="submit-btn" disabled={loading || (!file && !text)}>
            {loading ? 'Analyzing...' : <><FiCheckCircle /> Analyze Resume</>}
          </button>
        </form>
      </div>
      {loading && <div className="loading-container"><div className="loading-spinner" /><p className="loading-text">Our AI is analyzing your resume...</p></div>}
      {data && !loading && <FormattedResult content={data.analysis || data.result} title="Resume Analysis Report" />}
    </div>
  );
}

export default ResumeAnalyzer;