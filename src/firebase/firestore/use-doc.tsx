// src/firebase/firestore/use-doc.tsx
'use client';
import { onSnapshot, type DocumentReference } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useDoc<T>(ref: DocumentReference<T> | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ref) {
      setData(null);
      setLoading(false);
      return;
    }
    const unsubscribe = onSnapshot(ref, (doc) => {
      setData(doc.exists() ? doc.data() : null);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching document:", error);
        setData(null);
        setLoading(false);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.path]);

  return { data, loading };
}
