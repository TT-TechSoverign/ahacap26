'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getProductImages } from '../../../lib/product-images';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string;
}

const PIN_CODE = '1984'; // Simple protection for V1

export default function InventoryAdmin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Toast State
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | null }>({ message: '', type: null });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: null }), 3000);
    };

    // --- EFFECT: Auth & Data Load ---
    useEffect(() => {
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated, refreshTrigger]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/products`);
            if (res.ok) {
                const data = await res.json();
                // Sort by ID descending (newest first)
                setProducts(data.sort((a: Product, b: Product) => b.id - a.id));
            }
        } catch (err) {
            console.error(err);
            showToast('Connection Error: Is Backend Running?', 'error');
        } finally {
            setLoading(false);
        }
    };

    // --- HANDLERS ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === PIN_CODE) {
            setIsAuthenticated(true);
            showToast('System Access Granted', 'success');
        } else {
            showToast('Access Denied: Invalid PIN', 'error');
        }
    };

    const handleSave = async () => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
        const method = currentProduct.id ? 'PUT' : 'POST';
        const url = currentProduct.id ? `${apiUrl}/products/${currentProduct.id}` : `${apiUrl}/products`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProduct),
            });

            if (res.ok) {
                setIsEditing(false);
                setCurrentProduct({});
                setRefreshTrigger(prev => prev + 1);
                showToast(currentProduct.id ? 'Unit Configuration Updated' : 'New Unit Deployed', 'success');
            } else {
                showToast('Operation Failed: Check Console', 'error');
            }
        } catch (err) {
            console.error(err);
            showToast('System Error: Could not save', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
            const res = await fetch(`${apiUrl}/products/${id}`, { method: 'DELETE' });

            if (res.ok) {
                // Immediately remove from local state for instant feedback
                setProducts(prev => prev.filter(p => p.id !== id));
                showToast('Unit Removed from Inventory', 'success');
            } else {
                showToast('Delete Failed: Server Error', 'error');
            }
        } catch (err) {
            showToast('Delete Failed: Network Error', 'error');
        }
    };

    const handleDuplicate = (product: Product) => {
        setCurrentProduct({
            ...product, // ID is usually ignored by backend for POST, or explicitly remove it
            id: undefined,
            name: `${product.name} (Copy)`
        });
        setIsEditing(true);
        showToast('Configuration Cloned', 'success');
    };

    // --- RENDER ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f131a] flex items-center justify-center p-4 relative overflow-hidden">
                {/* Toast Container */}
                <div className={`fixed top-6 right-6 z-[200] transition-all duration-500 transform ${toast.type ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
                   {toast.type && (
                       <div className={`px-6 py-4 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                           <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
                           <span className="font-bold uppercase tracking-wide text-sm">{toast.message}</span>
                       </div>
                   )}
                </div>

                <form onSubmit={handleLogin} className="w-full max-w-sm bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl relative z-10">
                    <h1 className="text-2xl font-black text-white uppercase mb-6 tracking-tight text-center">System Access</h1>
                    <input
                        type="password"
                        value={pin}
                        onChange={e => setPin(e.target.value)}
                        placeholder="ENTER PIN"
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-center text-white tracking-[0.5em] font-mono text-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all mb-4"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg uppercase tracking-widest transition-all">
                        Initialize
                    </button>
                    <p className="text-center text-xs text-slate-600 mt-4 font-mono">SECURE CONSOLE V1.0</p>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f131a] text-slate-200 font-sans selection:bg-primary/30 relative">
             {/* Toast Container (Authenticated) */}
             <div className={`fixed bottom-6 right-6 z-[200] transition-all duration-500 transform ${toast.type ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
                   {toast.type && (
                       <div className={`px-6 py-4 rounded-xl border flex items-center gap-3 shadow-2xl backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                           <span className="material-symbols-outlined">{toast.type === 'success' ? 'check_circle' : 'error'}</span>
                           <span className="font-bold uppercase tracking-wide text-sm">{toast.message}</span>
                       </div>
                   )}
            </div>
            {/* Header */}
            <header className="fixed top-0 inset-x-0 h-16 bg-[#090b10]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary animate-pulse">terminal</span>
                    <h1 className="font-header font-black text-lg uppercase tracking-wide text-white">Inventory Command Center</h1>
                </div>
                <button
                    onClick={() => { setCurrentProduct({}); setIsEditing(true); }}
                    className="bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/50 px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">add_circle</span>
                    New Unit
                </button>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-6 max-w-[1600px] mx-auto">
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.02]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 text-xs uppercase tracking-wider font-bold text-slate-400 border-b border-white/5">
                                <th className="p-4 w-20 text-center">ID</th>
                                <th className="p-4 w-24">Image</th>
                                <th className="p-4">Product Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4 text-right">Price</th>
                                <th className="p-4 text-center">Stock</th>
                                <th className="p-4 text-right">Controls</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="p-4 text-center text-slate-500 font-mono text-xs">#{product.id}</td>
                                    <td className="p-4">
                                        <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden relative border border-white/10">
                                            {getProductImages(product.id)[0] ? (
                                                <Image src={getProductImages(product.id)[0]} alt="" fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-700 font-bold text-xs">NO IMG</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-white text-sm">{product.name}</div>
                                        {/* Show extra info like extracted Model # if applicable */}
                                        {product.name.match(/\((.*?)\)/) && (
                                            <div className="text-[10px] text-slate-500 font-mono mt-1">
                                                MDL: {product.name.match(/\((.*?)\)/)?.[1]}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/5">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono text-emerald-400 font-bold">
                                        ${product.price}
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${product.stock > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                                                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDuplicate(product)}
                                                className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                                                title="Duplicate"
                                            >
                                                <span className="material-symbols-outlined text-lg">content_copy</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl bg-[#0f131a] border border-white/10 rounded-2xl shadow-2xl p-8 relative">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>

                        <h2 className="text-xl font-header font-black text-white uppercase tracking-wide mb-8 border-b border-white/5 pb-4">
                            {currentProduct.id ? 'Edit Unit Configuration' : 'Deploy New Unit'}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Product Name</label>
                                    <input
                                        type="text"
                                        value={currentProduct.name || ''}
                                        onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-medium"
                                        placeholder="E.g. LG Dual Inverter..."
                                    />
                                    <p className="text-[10px] text-slate-600 mt-1">Include model # in parentheses for auto-extraction.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Price ($)</label>
                                        <input
                                            type="number"
                                            value={currentProduct.price || 0}
                                            onChange={e => setCurrentProduct({...currentProduct, price: parseInt(e.target.value)})}
                                            className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-primary outline-none font-mono"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Stock</label>
                                        <input
                                            type="number"
                                            value={currentProduct.stock || 0}
                                            onChange={e => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value)})}
                                            className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-primary outline-none font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Category</label>
                                    <select
                                        value={currentProduct.category || 'WINDOW_AC'}
                                        onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-primary outline-none"
                                    >
                                        <option value="WINDOW_AC">WINDOW_AC</option>
                                        <option value="SERVICE">SERVICE</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-widest">Image URL</label>
                                    <input
                                        type="text"
                                        value={currentProduct.image_url || ''}
                                        onChange={e => setCurrentProduct({...currentProduct, image_url: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono text-xs"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>

                            {/* Preview / Image */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center text-center">
                                <div className="w-full aspect-[5/4] bg-black/40 rounded-lg mb-4 relative overflow-hidden border border-white/5 flex items-center justify-center group/preview">
                                    {(currentProduct.image_url || (currentProduct.id && getProductImages(currentProduct.id)[0])) ? (
                                        <Image
                                            src={currentProduct.image_url || getProductImages(currentProduct.id!)[0]}
                                            alt="Preview"
                                            fill
                                            className="object-contain p-2"
                                            unoptimized={!!currentProduct.image_url} // Allow external images
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-4xl text-slate-700">image</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-500">
                                    Preview Display
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-white/5">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest text-white bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(0,174,239,0.3)] hover:shadow-[0_0_30px_rgba(0,174,239,0.5)] transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
