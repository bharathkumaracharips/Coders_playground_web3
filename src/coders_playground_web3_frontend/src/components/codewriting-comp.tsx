import React, { useState, useEffect } from 'react';
import { CodeWritingUI } from '../ui/code-writing-ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Play, Upload } from 'lucide-react';

type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  status: "Solved" | "Attempted" | "Not Started";
  acceptance: number;
  frequency: number;
  tags: string[];
  premium: boolean;
};

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'rust', label: 'Rust' },
  { value: 'solidity', label: 'Solidity' },
  { value: 'motoko', label: 'Motoko' },
];

export const CodeWritingComp = ({ problem, language: courseLanguage }: { problem: Problem, language?: string }) => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Write your code here...');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (courseLanguage) {
      const langValue = courseLanguage.toLowerCase().replace('++', 'pp');
      const foundLang = languages.find(l => l.label.toLowerCase() === courseLanguage.toLowerCase() || l.value === langValue);
      if (foundLang) {
        setLanguage(foundLang.value);
      }
    }
  }, [courseLanguage]);

  const handleRun = () => {
    setOutput(`Running ${language} code...\n${code}`);
  };

  const problemDescription = `
<h2 class="text-xl font-bold mb-4">${problem.title}</h2>
<p class="mb-4">This is a placeholder for the full problem description. Details for "${problem.title}" would be fetched and displayed here.</p>
<p class="mb-2"><strong>Difficulty:</strong> ${problem.difficulty}</p>
<p class="mb-2"><strong>Acceptance:</strong> ${problem.acceptance}%</p>
<p class="mb-4"><strong>Tags:</strong> ${problem.tags.join(', ')}</p>
<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
`;

  const languageSelector = (
    <Select value={language} onValueChange={setLanguage} disabled={!!courseLanguage}>
      <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-700">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const actions = (
    <>
      <Button variant="secondary" onClick={handleRun}>
        <Play className="h-4 w-4 mr-2" />
        Run
      </Button>
      <Button variant="secondary">
        <Upload className="h-4 w-4 mr-2" />
        Submit
      </Button>
    </>
  );

  const editor = (
    <textarea
      className="w-full h-full bg-neutral-900 text-white p-4 font-mono text-sm resize-none"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    />
  );

  return (
    <CodeWritingUI
      problem={<div dangerouslySetInnerHTML={{ __html: problemDescription }} />}
      editor={editor}
      console={<pre className="whitespace-pre-wrap">{output}</pre>}
      languageSelector={languageSelector}
      actions={actions}
    />
  );
}; 