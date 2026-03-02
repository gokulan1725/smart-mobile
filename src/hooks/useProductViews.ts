import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve a session ID for anonymous tracking
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('browse_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('browse_session_id', sessionId);
  }
  return sessionId;
};

export const trackProductView = async (productId: string, userId?: string) => {
  try {
    await supabase.from('product_views').insert({
      product_id: productId,
      user_id: userId || null,
      session_id: getSessionId(),
    });
  } catch (error) {
    console.error('Failed to track view:', error);
  }
};

export const useBrowsedProducts = () => {
  const getBrowsedProducts = (): { id: string; name: string; brand: string; price: number }[] => {
    try {
      const stored = localStorage.getItem('browsed_products');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const addBrowsedProduct = (product: { id: string; name: string; brand: string; price: number }) => {
    const browsed = getBrowsedProducts().filter(p => p.id !== product.id);
    browsed.unshift(product);
    localStorage.setItem('browsed_products', JSON.stringify(browsed.slice(0, 20)));
  };

  return { getBrowsedProducts, addBrowsedProduct };
};
