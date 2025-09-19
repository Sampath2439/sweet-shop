import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Sweet } from '../types';
import { sweetService } from '../services/sweetService';

interface SweetContextType {
    sweets: Sweet[];
    loading: boolean;
    getSweet: (id: string) => Sweet | undefined;
    addSweet: (sweet: Omit<Sweet, 'id'>) => Promise<void>;
    updateSweet: (sweet: Sweet) => Promise<void>;
    deleteSweet: (id: string) => Promise<void>;
    fetchSweets: () => Promise<void>; // Expose fetch function
}

const SweetContext = createContext<SweetContextType | undefined>(undefined);

export const SweetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [sweets, setSweets] = useState<Sweet[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSweets = useCallback(async () => {
        setLoading(true);
        try {
            const sweetsData = await sweetService.getSweets();
            setSweets(sweetsData);
        } catch (error) {
            console.error("Failed to fetch sweets:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSweets();
    }, [fetchSweets]);

    const getSweet = (id: string) => sweets.find(s => s.id === id);

    const addSweet = async (sweetData: Omit<Sweet, 'id'>) => {
        await sweetService.addSweet(sweetData);
        await fetchSweets(); // Refetch to get the latest list
    };

    const updateSweet = async (updatedSweet: Sweet) => {
        await sweetService.updateSweet(updatedSweet);
        await fetchSweets(); // Refetch for consistency
    };

    const deleteSweet = async (id: string) => {
        await sweetService.deleteSweet(id);
        setSweets(prevSweets => prevSweets.filter(s => s.id !== id));
    };

    return (
        <SweetContext.Provider value={{ sweets, loading, getSweet, addSweet, updateSweet, deleteSweet, fetchSweets }}>
            {children}
        </SweetContext.Provider>
    );
};

export const useSweets = () => {
    const context = useContext(SweetContext);
    if (context === undefined) {
        throw new Error('useSweets must be used within a SweetProvider');
    }
    return context;
};
