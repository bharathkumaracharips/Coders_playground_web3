import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./resizable";

export const CodeWritingUI = ({
  problem,
  editor,
  console,
  languageSelector,
  actions,
}: {
  problem: React.ReactNode;
  editor: React.ReactNode;
  console: React.ReactNode;
  languageSelector: React.ReactNode;
  actions: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col h-full w-full bg-neutral-900 text-white">
      <header className="flex items-center justify-between p-2 border-b border-neutral-800">
        <h1 className="text-lg font-bold">Code Editor</h1>
        <div className="flex items-center gap-4">
          {languageSelector}
          <div className="flex items-center gap-2">
            {actions}
          </div>
        </div>
      </header>
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full p-4 overflow-y-auto">
            {problem}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={30}>
              <div className="h-full relative">
                {editor}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={30} minSize={10}>
              <div className="h-full p-4 bg-black">
                <h3 className="text-sm font-semibold mb-2">Console</h3>
                {console}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}; 