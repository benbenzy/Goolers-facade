import React from 'react';

function TransactionComponent({ item }: any) {
  return (
    <tr className="mt-2">
      <td className="flex flex-row gap-2 p-2 items-center">
        {item?.checkout_request_id}
      </td>

      <td className="p-2">{item?.amount?.toLocaleString()}</td>

      <td className="">
        {new Date(item?.created_at).toDateString()}
        <span> at {new Date(item?.created_at).getHours()}</span>
        <span>:{new Date(item?.created_at).getMinutes()}</span>
      </td>
      <td
        className={` font-medium p-2 ${
          item.status === 'waiting'
            ? 'text-yellow-600'
            : item.status === 'success'
            ? 'text-lime-600'
            : item.status === 'reversed'
            ? 'text-gray-400'
            : 'text-red-600'
        }`}
      >
        {item?.status}
      </td>
    </tr>
  );
}

export default TransactionComponent;
