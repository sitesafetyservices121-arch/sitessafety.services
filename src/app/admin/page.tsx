"use client";

import withAdminAuth from '@/components/with-admin-auth';

function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Panel</h1>
      <p className="text-lg text-muted-foreground">Select an option from the sidebar to manage your site.</p>
    </div>
  );
}

export default withAdminAuth(AdminPage);