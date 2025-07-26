"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Search from "@/components/Search";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (!confirmed) {
      e.preventDefault(); // Prevent form submission
    }
  };
  return (
    <header className="hidden items-center justify-between gap-5 p-5 sm:flex lg:py-7 xl:gap-10 !important">
      <Search />
      <div className="flex items-center justify-center min-w-fit gap-4 !important">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form action={signOutUser} onSubmit={handleLogout}>
          <Button type="submit" className="flex-center h-[52px] min-w-[54px] items-center rounded-full bg-[#FA7275]/10 p-0 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20 !important">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;