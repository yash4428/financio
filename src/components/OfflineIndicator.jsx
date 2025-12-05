import React, { useState } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <button 
      onClick={() => setIsOnline(!isOnline)}
      className={`fixed top-4 left-4 z-50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg transition-colors cursor-pointer ${
        isOnline ? 'bg-white/90 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'
      }`}
    >
      {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
      {isOnline ? 'Online' : 'Offline Mode'}
    </button>
  );
};

export default OfflineIndicator;    