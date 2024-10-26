import './ui/globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { getProducts, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import Sliders from '@/components/ui/Sliders/Slider';

export default async function Home() {
  const supabase = createClient();
  const [user, products] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
  ]);
  return (
    <main>
      <Navbar user={user} />
      <div className="mt-12 space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
        <Sliders products={products ?? []} user={user} />
      </div>
      <Footer />
    </main>
  );
}
