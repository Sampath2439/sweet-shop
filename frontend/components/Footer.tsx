
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-200 mt-16">
      <div className="container mx-auto px-6 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} The Sweet Spot. All Rights Reserved.</p>
        <p className="text-sm text-neutral-400 mt-1">Crafted with care for candy lovers.</p>
      </div>
    </footer>
  );
};

export default Footer;
