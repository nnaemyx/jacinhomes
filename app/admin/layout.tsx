"use client"

import AdminLayoutClient from "@/components/common/Admin/AdminLayout";
import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
};

export default AdminLayout;
