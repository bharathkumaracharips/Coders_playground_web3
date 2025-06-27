import React from 'react';

interface TestComponentProps {
  text: string;
}

const TestComponent: React.FC<TestComponentProps> = ({ text }) => {
  return <div style={{ color: 'blue', fontWeight: 'bold' }}>{text}</div>;
};

export default TestComponent; 