// src/components/layout/Layout.tsx
import React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Sidebar from './Sidebar/index';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="flex flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="h-full bg-gray-800">
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-gray-600" />
        <ResizablePanel className="flex-1 h-full bg-white overflow-auto">
          <div className="h-full w-full p-6">
            {children}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Layout;
