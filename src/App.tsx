import React from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { CampaignsTab } from './components/campaigns/CampaignsTab';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white bg-space">
      <Sidebar />
      <TopBar />
      
      <main className="pl-20 pt-16 min-h-screen">
        <CampaignsTab />
      </main>
    </div>
  );
}

export default App;