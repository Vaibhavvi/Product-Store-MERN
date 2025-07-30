// store/product.js
import { create } from 'zustand';

const BASE_URL = 'https://product-store-mern-backend.onrender.com/api'; // ✅ your deployed backend

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`);
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      }
    } catch (err) {
      console.error('Failed to fetch products', err.message);
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields.' };
    }

    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to create product' };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: 'Product created successfully!' };
    } catch (error) {
      return { success: false, message: error.message || 'Something went wrong' };
    }
  },

  deleteProduct: async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to delete' };
      }

      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));

      return { success: true, message: 'Product deleted successfully!' };
    } catch (error) {
      return { success: false, message: error.message || 'Server error' };
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.message || 'Failed to update' };
      }

      set((state) => ({
        products: state.products.map((p) => (p._id === id ? data.data : p)),
      }));

      return { success: true, message: 'Product updated successfully!' };
    } catch (error) {
      return { success: false, message: error.message || 'Server error' };
    }
  },
}));
