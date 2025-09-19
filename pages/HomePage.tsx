
import React, { useState, useMemo, useEffect } from 'react';
import { useSweets } from '../context/SweetContext';
import { Sweet } from '../types';
import { useCart } from '../context/CartContext';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';

const SweetCard: React.FC<{ sweet: Sweet; onAddToCart: (sweet: Sweet) => void }> = ({ sweet, onAddToCart }) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={sweet.imageUrl} alt={sweet.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-neutral-900">{sweet.name}</h3>
        <p className="text-sm text-neutral-700 bg-accent/20 px-2 py-1 rounded-full self-start my-2">{sweet.category}</p>
        <p className="text-neutral-700 flex-grow">{sweet.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-primary">₹{sweet.price.toFixed(2)}</p>
          <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-500' : 'text-green-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `${sweet.quantity} in stock`}
          </p>
        </div>
        <Button 
          onClick={() => onAddToCart(sweet)} 
          disabled={isOutOfStock}
          className="w-full mt-4"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
    const { sweets, loading } = useSweets();
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = useMemo(() => ['All', ...new Set(sweets.map(s => s.category))], [sweets]);

    const filteredSweets = useMemo(() => {
        return sweets.filter(sweet => {
            const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
            const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [sweets, searchTerm, selectedCategory]);
    
    const handleAddToCart = (sweet: Sweet) => {
        addToCart(sweet, 1);
        // Maybe add a toast notification here
    };

    return (
        <div className="bg-neutral-100">
            <div className="relative h-96 flex items-center justify-center text-center overflow-hidden">
                <div 
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-fixed"
                    style={{ 
                        backgroundImage: `url('https://picsum.photos/seed/sweetsbg/1920/1080')`,
                        transform: `translateY(${offsetY * 0.5}px)`
                    }}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
                <div className="relative z-10 px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Discover Your Sweet Escape</h1>
                    <p className="text-xl text-neutral-200 mt-4 max-w-2xl mx-auto">From classic chocolates to exotic candies, find your perfect treat.</p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-20 z-40 flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search for sweets..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 px-4 py-2 bg-white text-neutral-900 placeholder-neutral-500 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="w-full md:w-1/2">
                         <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="w-full px-4 py-2 bg-white text-neutral-900 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {loading ? <Spinner /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredSweets.map(sweet => (
                            <SweetCard key={sweet.id} sweet={sweet} onAddToCart={handleAddToCart} />
                        ))}
                    </div>
                )}
                {filteredSweets.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-neutral-700">No Sweets Found</h2>
                        <p className="text-neutral-500 mt-2">Try adjusting your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
