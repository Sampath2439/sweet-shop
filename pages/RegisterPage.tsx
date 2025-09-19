
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setError('');
        setLoading(true);
        try {
            await register(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-neutral-100 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-neutral-900 mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Input id="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    <Input id="confirmPassword" label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Spinner /> : 'Register'}
                    </Button>
                </form>
                <p className="text-center text-sm text-neutral-700 mt-6">
                    Already have an account? <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
