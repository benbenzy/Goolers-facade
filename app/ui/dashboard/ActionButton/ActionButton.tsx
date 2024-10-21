import Link from 'next/link';

export const ActionButton = ({
  pathname,
  query,
  icon,
  name,
}: {
  pathname: string;
  query: {};
  icon: any;
  name: string;
}) => {
  return (
    <Link
      className=" hover:bg-slate-500"
      replace
      href={{
        pathname: pathname,
        query: query,
      }}
    >
      <span className="flex flex-row gap-1 items-center text-green-500">
        {icon}
        {name}
      </span>
    </Link>
  );
};
