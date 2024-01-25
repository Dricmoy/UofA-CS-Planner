import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <div>
      <img 
        src="https://www.ualberta.ca/uofa-tomorrow/media-library/updates/health-sciences-ua.png" 
        alt="UAlberta Logo"
        style={{ height: '400px', width: '600px' }} 
      />
      <Header />
      <Footer />
    </div>
  );
}

export default App;
