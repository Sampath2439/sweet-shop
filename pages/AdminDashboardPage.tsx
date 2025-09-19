import React, { useState } from 'react';
import { useSweets } from '../context/SweetContext';
import { Sweet } from '../types';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Spinner from '../components/common/Spinner';
import { generateSweetDescription } from '../services/geminiService';

const SweetFormModal: React.FC<{
  sweet: Sweet | null;
  onClose: () => void;
  onSave: (sweet: Omit<Sweet, 'id'> | Sweet) => void;
}> = ({ sweet, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: sweet?.name || '',
    category: sweet?.category || '',
    price: sweet?.price || 0,
    quantity: sweet?.quantity || 0,
    description: sweet?.description || '',
    imageUrl: sweet?.imageUrl || ''
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(sweet) {
        onSave({ ...sweet, ...formData });
    } else {
        onSave(formData);
    }
  };
  
  const handleGenerateDescription = async () => {
    if(!formData.name || !formData.category) {
        alert("Please enter a name and category first.");
        return;
    }
    setIsGenerating(true);
    const description = await generateSweetDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-4">{sweet ? 'Edit Sweet' : 'Add New Sweet'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
            <Input label="Category" name="category" value={formData.category} onChange={handleChange} required />
            <Input label="Image URL" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" />
            <div className="flex gap-4">
                 <Input label="Price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                 <Input label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-3 py-2 border border-neutral-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition" required></textarea>
              <Button type="button" variant="secondary" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 text-sm">
                {isGenerating ? <Spinner/> : '✨ Generate with AI'}
              </Button>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" onClick={onClose} className="bg-neutral-200 text-neutral-800 hover:bg-neutral-300">Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
      </div>
    </div>
  );
};


const AdminDashboardPage: React.FC = () => {
  const { sweets, loading, addSweet, updateSweet, deleteSweet } = useSweets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState<Sweet | null>(null);

  const handleOpenModal = (sweet: Sweet | null = null) => {
    setEditingSweet(sweet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSweet(null);
  };

  const handleSaveSweet = (sweetData: Omit<Sweet, 'id'> | Sweet) => {
    if ('id' in sweetData) {
      updateSweet(sweetData as Sweet);
    } else {
      addSweet(sweetData as Omit<Sweet, 'id'>);
    }
    handleCloseModal();
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
        <Button onClick={() => handleOpenModal()}>Add New Sweet</Button>
      </div>
      
      {loading ? <Spinner /> : (
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-neutral-100 border-b-2 border-neutral-200">
                    <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-700 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-700 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-700 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-700 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-sm font-semibold text-neutral-700 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                    {sweets.map(sweet => (
                        <tr key={sweet.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">{sweet.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-neutral-700">{sweet.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-neutral-700">₹{sweet.price.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-neutral-700">{sweet.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex gap-2">
                                    <Button variant="secondary" onClick={() => handleOpenModal(sweet)} className="text-sm">Edit</Button>
                                    <Button variant="danger" onClick={() => deleteSweet(sweet.id)} className="text-sm">Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      )}
      {isModalOpen && <SweetFormModal sweet={editingSweet} onClose={handleCloseModal} onSave={handleSaveSweet} />}
    </div>
  );
};

export default AdminDashboardPage;