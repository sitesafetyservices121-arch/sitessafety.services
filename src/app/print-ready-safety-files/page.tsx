import type { Metadata } from 'next';
import PrintReadySafetyFilesClient from './client';

export const metadata: Metadata = {
  title: 'Electronically Delivered Safety Files',
  description: 'Receive your complete, print-ready safety file electronically. Fast, efficient, and compliant.',
};

export default function PrintReadySafetyFilesPage() {
  return <PrintReadySafetyFilesClient />;
}