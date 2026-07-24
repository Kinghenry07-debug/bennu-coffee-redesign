import React, { useState } from 'react';
import { PageId, MenuItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { DrinkQuizModal } from './components/DrinkQuizModal';
import { SocialHandoutModal } from './components/SocialHandoutModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { LocationsPage } from './pages/LocationsPage';
import { CateringPage } from './pages/CateringPage';
import { MerchPage } from './pages/MerchPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSocialHandoutOpen, setIsSocialHandoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [selectedLocationId, setSelectedLocationId] = useState('mlk');

  return (
    <div className="min-h-screen bg-[#120b08] text-white font-sans selection:bg-[#e69b57] selection:text-stone-950 flex flex-col justify-between relative overflow-hidden">
      
      {/* Abstract Background Shapes for Frosted Glass Mesh Effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#3d2419] rounded-full blur-[120px] opacity-40 pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#8c5a3c] rounded-full blur-[150px] opacity-20 pointer-events-none z-0" />
      <div className="fixed top-[30%] left-[40%] w-[350px] h-[350px] bg-[#e69b57] rounded-full blur-[110px] opacity-15 pointer-events-none z-0" />

      {/* Interactive Cursor Follower */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSocialHandout={() => setIsSocialHandoutOpen(true)}
        cursorEnabled={cursorEnabled}
        setCursorEnabled={setCursorEnabled}
        selectedLocationId={selectedLocationId}
        setSelectedLocationId={setSelectedLocationId}
      />

      {/* Main Page View Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onSelectDrinkToCustomize={(item) => setCustomizerItem(item)}
            onOpenQuiz={() => setIsQuizOpen(true)}
            selectedLocationId={selectedLocationId}
          />
        )}

        {currentPage === 'menu' && (
          <MenuPage
            onSelectDrinkToCustomize={(item) => setCustomizerItem(item)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {currentPage === 'story' && <StoryPage />}

        {currentPage === 'locations' && (
          <LocationsPage
            setCurrentPage={setCurrentPage}
            selectedLocationId={selectedLocationId}
            setSelectedLocationId={setSelectedLocationId}
          />
        )}

        {currentPage === 'catering' && (
          <CateringPage
            onShowToast={(msg) => setToastMessage(msg)}
          />
        )}

        {currentPage === 'merch' && (
          <MerchPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSocialHandout={() => setIsSocialHandoutOpen(true)}
      />

      {/* Drink Spotlight Modal */}
      <DrinkCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
      />

      {/* Drink Match Quiz Modal */}
      <DrinkQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectDrinkToCustomize={(item) => setCustomizerItem(item)}
      />

      {/* Social Handout Modal */}
      <SocialHandoutModal
        isOpen={isSocialHandoutOpen}
        onClose={() => setIsSocialHandoutOpen(false)}
      />

      {/* Notification Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
