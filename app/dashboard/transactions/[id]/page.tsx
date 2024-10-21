'use client';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Modal = ({ children, show, onclose }: any) => {
  return (
    <dialog id="my_modal_3" className={`modal ${show ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={onclose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">update</h3>
        {children}
      </div>
    </dialog>
  );
};
function TransactionsDetails() {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<any>(null);
  const supabase = createClient();
  const pathName = usePathname();
  const id = pathName.split('/').pop();
  const { data: transaction } = useQuery({
    queryKey: ['transactionsDetails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*,profiles(*),courses(*)')
        .eq('id', id)
        .single();
      if (error) {
        console.log('failed to get transaction details');
      }
      return data;
    },
  });
  const handleClose = () => {
    setShowModal(false);
  };
  const updateTransaction = (item: any) => {
    submitUpdate(item);
  };
  const {
    mutate: submitUpdate,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: async (data: any) => {
      const { data: status, error } = await supabase
        .from('transactions')
        .update({
          status: data?.status,
          mpesa_receipt_number: data?.mpesa_receipt_number,
        })
        .eq('id', data?.id);
      if (error) {
        console.log('failed to update transaction');
        throw new Error(`failed to update${error.message}`);
      }
      return status;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['transactionsDetails'] }),
  });
  useEffect(() => {
    setData(transaction);
  }, [transaction]);
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>
              <button onClick={() => setShowModal(true)} className="btn">
                update
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Date</td>
            <td>{new Date(transaction?.created_at).toDateString()}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{transaction?.phone_number}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>{transaction?.amount}</td>
          </tr>
          <tr>
            <td>Request_code</td>
            <td>{transaction?.checkout_request_id}</td>
          </tr>

          <tr>
            <td>Confirmation_code</td>
            <td>{transaction?.mpesa_receipt_number}</td>
          </tr>
          <tr>
            <td>status</td>
            <td>{transaction?.status}</td>
          </tr>
          <tr>
            <td>User</td>
            <td>{transaction?.user_id}</td>
          </tr>
          <tr>
            <td>Course</td>
            <td>{transaction?.course_id}</td>
          </tr>
        </tbody>
      </table>
      <Modal onclose={handleClose} show={showModal}>
        <div className="flex flex-col items-center gap-5 ">
          {isPending && (
            <div className="flex items-center">
              <span className="loading loading-ring loading-xs"></span>
              <span className="loading loading-ring loading-sm"></span>
              <span className="loading loading-ring loading-md"></span>
              <span className="loading loading-ring loading-lg"></span>
            </div>
          )}
          {isSuccess && (
            <div className="flex items-center text-green-500">success</div>
          )}
          <label className="input flex items-center gap-2 input-bordered w-full max-w-lg">
            status
            <select
              onChange={(e) => setData({ ...data, status: e.target.value })}
              value={data?.status ?? ''}
              className="grow select"
              name="status"
              id=""
            >
              <option value="pending">pending</option>
              <option value="success">success</option>
              <option value="failed">failed</option>
            </select>
          </label>
          <label className="input flex items-center input-bordered w-full max-w-lg gap-2">
            code
            <input
              onChange={(e) =>
                setData({ ...data, mpesa_receipt_number: e.target.value })
              }
              value={data?.mpesa_receipt_number ?? ''}
              type="text"
              className="input grow"
              placeholder="receipt number"
            />
          </label>
          <input
            type="submit"
            onClick={() => updateTransaction(data)}
            className="btn input-bordered w-full max-w-lg btn-primary"
          />
        </div>
      </Modal>
    </div>
  );
}

export default TransactionsDetails;
