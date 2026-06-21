import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { api } from '../services/api';
import FormattedResult from '../components/FormattedResult';
import { FiUserCheck, FiHelpCircle, FiCheck } from 'react-icons/fi';

function InterviewPrep() {
  const [tab, setTab] = useState('questions');
  const [role, setRole] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  
  const questionsApi = useApi(api.getInterviewQuestions);
  const evaluateApi = useApi(api.evaluateAnswer);

  return (
    <div>
      <div className="page-header">
        <h1><div className="header-icon"><FiUserCheck /></div>Interview Preparation</h1>
        <p>Practice with AI-generated questions and get detailed answer evaluations.</p>
      </div>
      <div className="tab-container">
        <button className={`tab-btn ${tab==='questions'?'active':''}`} onClick={()=>setTab('questions')}><FiHelpCircle /> Questions</button>
        <button className={`tab-btn ${tab==='evaluate'?'active':''}`} onClick={()=>setTab('evaluate')}><FiCheck /> Evaluate Answer</button>
      </div>
      {tab === 'questions' && (
        <>
          <div className="form-container">
            <form onSubmit={(e)=>{e.preventDefault();questionsApi.execute(role,difficulty,topic);}}>
              <div className="form-group"><label>Target Role</label><input value={role} onChange={e=>setRole(e.target.value)} placeholder="Frontend Developer" required /></div>
              <div className="form-group"><label>Difficulty</label><select value={difficulty} onChange={e=>setDifficulty(e.target.value)}><option>easy</option><option>medium</option><option>hard</option></select></div>
              <div className="form-group"><label>Topic Focus (optional)</label><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="React, System Design" /></div>
              <button className="submit-btn" disabled={questionsApi.loading || !role}>Generate Questions</button>
            </form>
          </div>
          {questionsApi.data && <FormattedResult content={questionsApi.data.questions} title="Practice Questions" />}
        </>
      )}
      {tab === 'evaluate' && (
        <>
          <div className="form-container">
            <form onSubmit={(e)=>{e.preventDefault();evaluateApi.execute(question,answer,role);}}>
              <div className="form-group"><label>Role</label><input value={role} onChange={e=>setRole(e.target.value)} required /></div>
              <div className="form-group"><label>Interview Question</label><textarea value={question} onChange={e=>setQuestion(e.target.value)} rows="3" required /></div>
              <div className="form-group"><label>Your Answer</label><textarea value={answer} onChange={e=>setAnswer(e.target.value)} rows="6" required /></div>
              <button className="submit-btn" disabled={evaluateApi.loading}>Evaluate Answer</button>
            </form>
          </div>
          {evaluateApi.data && <FormattedResult content={evaluateApi.data.evaluation} title="Answer Evaluation" />}
        </>
      )}
    </div>
  );
}

export default InterviewPrep;