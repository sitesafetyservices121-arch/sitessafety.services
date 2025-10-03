// src/firebase/firestore/use-doc.tsx
'use client';
import { onSnapshot, type DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useDoc<T>(ref: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(ref, (doc) => {
      setData(doc.exists() ? doc.data() : null);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching document:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [ref]);

  return { data, loading };
}
