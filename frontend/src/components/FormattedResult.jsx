import { useState } from 'react';
import { FiCopy, FiCheck, FiAward, FiStar, FiTrendingUp, FiTarget, FiBookOpen } from 'react-icons/fi';

function FormattedResult({ content, title = "Analysis Result" }) {
  const [copied, setCopied] = useState(false);
  if (!content) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse markdown table from content
  const parseTable = (text) => {
    const lines = text.split('\n');
    const tableLines = [];
    let inTable = false;
    let startIndex = -1;
    let endIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          startIndex = i;
        }
        tableLines.push(line);
      } else if (line.match(/^\|[-:\s|]+\|$/)) {
        if (!inTable) {
          inTable = true;
          startIndex = i;
        }
        tableLines.push(line);
      } else {
        if (inTable) {
          endIndex = i;
          break;
        }
      }
    }

    if (tableLines.length >= 2 && startIndex >= 0) {
      const headerLine = tableLines[0];
      const dataLines = tableLines.slice(2);

      const headers = headerLine
        .split('|')
        .filter(h => h.trim())
        .map(h => h.trim());

      const rows = dataLines.map(line =>
        line
          .split('|')
          .filter(c => c.trim())
          .map(c => c.trim())
      );

      const beforeText = lines.slice(0, startIndex).join('\n');
      const afterText = lines.slice(endIndex >= 0 ? endIndex : lines.length).join('\n');
      const restText = (beforeText + '\n' + afterText).trim();

      return { headers, rows, restText };
    }

    return null;
  };

  const tableData = parseTable(content);

  // Parse non-table content into sections
  const parseSections = (text) => {
    if (!text || !text.trim()) return [];
    const rawSections = text.split('\n\n').filter(s => s.trim());
    
    return rawSections.map(section => {
      const lines = section.split('\n').filter(l => l.trim());
      const firstLine = lines[0].replace(/^[*#\-\s]+/, '').trim();
      
      const isMainHeading =
        /^\*\*.*\*\*$/.test(lines[0].trim()) ||
        lines[0].trim().startsWith('##') ||
        lines[0].trim().startsWith('###') ||
        /^[A-Z][A-Za-z\s]+:/.test(firstLine);

      let icon = null;
      const lower = firstLine.toLowerCase();
      if (lower.includes('score') || lower.includes('rating') || lower.includes('overall')) icon = <FiStar />;
      else if (lower.includes('strength') || lower.includes('good') || lower.includes('key')) icon = <FiTrendingUp />;
      else if (lower.includes('improv') || lower.includes('area') || lower.includes('missing')) icon = <FiTarget />;
      else if (lower.includes('skill') || lower.includes('learn') || lower.includes('resource')) icon = <FiBookOpen />;

      return {
        heading: isMainHeading ? firstLine : null,
        icon,
        lines: isMainHeading ? lines.slice(1) : lines,
      };
    });
  };

  const sections = tableData ? parseSections(tableData.restText) : parseSections(content);

  return (
    <div className="result-container">
      {/* Header */}
      <div className="result-header">
        <h2>
          <FiAward size={22} />
          {title}
        </h2>
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
          {copied ? 'Copied!' : 'Copy Report'}
        </button>
      </div>

      {/* Body */}
      <div className="result-body">
        {/* Render Table if exists */}
        {tableData && (
          <div className="table-wrapper">
            <table className="result-table">
              <thead>
                <tr>
                  {tableData.headers.map((header, i) => (
                    <th key={i}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Text Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="result-section">
            {section.heading && (
              <h3>
                {section.icon && section.icon}
                {section.heading.replace(/\*\*/g, '').replace(/[#]/g, '').trim()}
              </h3>
            )}
            <ul>
              {section.lines.map((line, lIdx) => {
                let clean = line.replace(/^[*\-#\s]+/, '').trim();
                if (!clean) return null;
                
                const hasBold = clean.includes('**');
                if (hasBold) {
                  const parts = clean.split('**');
                  return (
                    <li key={lIdx}>
                      {parts.map((part, pIdx) =>
                        pIdx % 2 === 1 ? (
                          <strong key={pIdx}>{part}</strong>
                        ) : (
                          <span key={pIdx}>{part}</span>
                        )
                      )}
                    </li>
                  );
                }

                // Score badges
                if (clean.toLowerCase().includes('/10') || clean.toLowerCase().includes('score:')) {
                  const scoreMatch = clean.match(/(\d+)\/10/);
                  const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
                  return (
                    <li key={lIdx}>
                      <span
                        className={`score-badge ${
                          score >= 8 ? 'high' : score >= 5 ? 'medium' : 'low'
                        }`}
                      >
                        {clean}
                      </span>
                    </li>
                  );
                }

                return <li key={lIdx}>{clean}</li>;
              })}
            </ul>
          </div>
        ))}

        {/* Fallback plain text */}
        {!tableData && sections.length === 0 && (
          <div className="result-section">
            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#475569' }}>
              {content}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormattedResult;