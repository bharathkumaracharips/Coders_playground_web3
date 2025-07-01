import React, { useState } from 'react';
import { CircleProgress } from './progress-graph';

// Example data structure for submissions
const submissionsData = [
  { id: 1, question: 'What is a blockchain?', status: 'Failed' },
  { id: 2, question: 'Explain smart contracts.', status: 'Under Review' },
  { id: 3, question: 'Describe consensus algorithms.', status: 'Successful' },
  { id: 4, question: 'What is a wallet?', status: 'Failed' },
];

const statusColors: Record<string, string> = {
  'Failed': 'bg-red-100 text-red-700',
  'Under Review': 'bg-yellow-100 text-yellow-700',
  'Successful': 'bg-green-100 text-green-700',
};

const getStatusCount = (status: string) =>
  submissionsData.filter((s) => s.status === status).length;

const SubmissionsUI: React.FC = () => {
  const [reevalRequested, setReevalRequested] = useState<number[]>([]);

  const handleReeval = (id: number) => {
    setReevalRequested((prev) => [...prev, id]);
    // Here you would trigger the actual reevaluation request logic
  };

  const total = submissionsData.length;
  const failed = getStatusCount('Failed');
  const underReview = getStatusCount('Under Review');
  const successful = getStatusCount('Successful');

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Submissions</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 flex flex-col items-center">
          <CircleProgress value={successful} maxValue={total} size={80} description={<span>Successful</span>} />
          <span className="mt-2 text-green-700 font-semibold">{successful} Successful</span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <CircleProgress value={underReview} maxValue={total} size={80} description={<span>Under Review</span>} />
          <span className="mt-2 text-yellow-700 font-semibold">{underReview} Under Review</span>
        </div>
        <div className="flex-1 flex flex-col items-center">
          <CircleProgress value={failed} maxValue={total} size={80} description={<span>Failed</span>} />
          <span className="mt-2 text-red-700 font-semibold">{failed} Failed</span>
        </div>
      </div>
      <div className="space-y-4">
        {submissionsData.map((submission) => (
          <div key={submission.id} className={`p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center justify-between ${statusColors[submission.status] || 'bg-gray-100 text-gray-700'}`}>
            <div>
              <div className="font-semibold">Question:</div>
              <div>{submission.question}</div>
              <div className="mt-1 text-sm">Status: <span className="font-bold">{submission.status}</span></div>
            </div>
            {submission.status === 'Failed' && !reevalRequested.includes(submission.id) && (
              <button
                className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => handleReeval(submission.id)}
              >
                Request Reevaluation
              </button>
            )}
            {reevalRequested.includes(submission.id) && (
              <span className="mt-3 md:mt-0 px-4 py-2 bg-gray-300 text-gray-700 rounded">Reevaluation Requested</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionsUI; 