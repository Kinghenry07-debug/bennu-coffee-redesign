import React, { useState } from 'react';
import { PageId, MenuItem, CartItem, DrinkCustomization } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { DrinkCustomizerModal } from './components/DrinkCustomizerModal';
import { DrinkQuizModal } from './components/DrinkQuizModal';
import { SocialHandoutModal } from './components/SocialHandoutModal';
import { CartDrawer } from './components/CartDrawer';
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
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [selectedLocationId, setSelectedLocationId] = useState('mlk');

  const handleAddToCart = (item: MenuItem, customization?: DrinkCustomization) => {
    const newItem: CartItem = {
      cartItemId: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      item,
      quantity: 1,
      customization,
      pickupLocationId: selectedLocationId
    };
    setCartItems(prev => [...prev, newItem]);
    setToastMessage(`Added "${item.name}" to your coffee order bag!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

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
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
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

      {/* Drink Spotlight & Order Customizer Modal */}
      <DrinkCustomizerModal
        item={customizerItem}
        onClose={() => setCustomizerItem(null)}
        onAddToCart={handleAddToCart}
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

      {/* Shopping Bag / Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedLocationId={selectedLocationId}
        setSelectedLocationId={setSelectedLocationId}
      />

      {/* Notification Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
}
