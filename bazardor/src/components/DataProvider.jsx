"use client";

import { createContext, useContext, useEffect, useState } from "react";

// two API addresses from the README - if the first one fails we try the second
const BASE_URLS = ["/api-data", "/api-data-2"];

async function getJson(path) {
  let lastError;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(base + path);
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

const DataContext = createContext({
  products: [],
  categories: [],
  loading: true,
  error: null,
});

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getJson("/products"), getJson("/categories")])
      .then(([p, c]) => {
        if (cancelled) return;
        setProducts(p);
        setCategories(c);
      })
      .catch((err) => {
        console.error("API error:", err);
        if (!cancelled) setError("তথ্য আনতে সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DataContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
