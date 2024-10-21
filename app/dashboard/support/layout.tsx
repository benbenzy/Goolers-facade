'use client';
import Footer from '@/app/ui/dashboard/footer/footer';
import Navbar from '@/app/ui/dashboard/navbar/navbar';
import Sidebar from '@/app/ui/dashboard/sidebar/sidebar';

function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex-row flex">
      <div className="flex-4 bg-slate-800 p-8">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
