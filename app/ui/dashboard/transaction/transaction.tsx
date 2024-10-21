import React from 'react';
import TransactionComponent from './transactionComponent';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getAllTransactions } from '@/utils/supabase/queries';

async function Transaction() {
  const supabase = createClient();
  const [transactions] = await Promise.all([getAllTransactions(supabase)]);
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="capitalize font-medium">latest transactions</h2>
        <Link
          href={'/dashboard/transactions'}
          className="bg-slate-500 rounded-md w-1/6 hover:bg-slate-300 hover:text-green-800 capitalize"
        >
          see all
        </Link>
      </div>
      <table className="w-full table table-xs">
        <thead className="p-2">
          <tr>
            <td className="p-2">id</td>
            <td className="p-2">amount</td>
            <td className="p-2">date</td>
            <td className="p-2">status</td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(transactions) &&
            transactions?.map((item) => (
              <TransactionComponent key={item.id} item={item} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transaction;
