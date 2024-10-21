'use client';

import Button from '@/components/ui/Button';
import LogoCloud from '@/components/ui/LogoCloud';
import { Tables } from '@/database.types';
import { getErrorRedirect } from '@/utils/helpers';
import { User } from '@supabase/supabase-js';
import cn from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

type Product = Tables<'leagues'>;

interface Props {
  products: Tables<'leagues'>[];
  user: User | null;
}

export default function Sliders({ products, user }: Props) {
  const router = useRouter();

  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (id: string) => {
    setPriceIdLoading(id);
    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }
    setPriceIdLoading(undefined);
  };

  if (!products?.length) {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            No Upcoming Matches
            <a
              className="text-pink-500 underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Goolers Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="bg-black">
        <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Upcoming leagues
            </h1>
          </div>
          <div className="mt-12  space-y-0 sm:mt-16 flex flex-wrap justify-center gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
            {Array.isArray(products) &&
              products?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className={cn(
                      'flex flex-col rounded-lg shadow-sm divide-y divide-zinc-600 bg-zinc-900',
                      {
                        'border border-pink-500': false
                          ? product.name === ''
                          : product.name === 'Freelancer',
                      },
                      'flex-1', // This makes the flex item grow to fill the space
                      'basis-1/3', // Assuming you want each card to take up roughly a third of the container's width
                      'max-w-xs' // Sets a maximum width to the cards to prevent them from getting too large
                    )}
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold leading-6 text-white">
                        {product?.name}
                      </h2>

                      <Button
                        variant="slim"
                        type="button"
                        loading={priceIdLoading === `${product?.name}`}
                        onClick={() => {
                          handleStripeCheckout(`${product?.id}`);
                        }}
                        className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}
