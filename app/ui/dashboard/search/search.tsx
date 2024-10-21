"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

interface prop {
  placeholder: string;
}

function Search({ placeholder }: prop) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      if (e.target.value) {
        e?.target?.value?.length > 3 && params.set("q", e?.target.value);
      } else {
        params.delete("q");
      }
      replace(`${pathName}?${params}`);
    },
    300
  );
  return (
    <div className="flex flex-row gap-2 rounded-md w-max bg-slate-800 items-center p-2">
      <MdSearch />
      <input
        onChange={handleSearch}
        placeholder={placeholder}
        className="  bg-transparent rounded-md "
      />
    </div>
  );
}

export default Search;
