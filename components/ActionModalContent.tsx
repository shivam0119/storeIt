import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: Models.Document }) => (
  <div className="!mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3 !important">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className=" text-[14px] leading-[20px] font-semibold mb-1">{file.name}</p>
      <FormattedDateTime date={file.$createdAt} className="text-[12px] leading-[16px] font-normal" />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="text-[14px] leading-[20px] font-normal w-[30%] text-light-100 !important text-left">{label}</p>
    <p className="text-[14px] leading-[20px] font-semibold flex-1 !important text-left">{value}</p>
  </div>
);

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <>
      <ImageThumbnail file={file} />

      <div className="!mt-2 space-y-2 !important">
        <p className="text-[14px] leading-[20px] font-semibold pl-1 text-[#333F4E]">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="text-[14px] leading-[20px] font-normal outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important h-[52px] w-full rounded-full border px-4 shadow-drop-1 !important"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-[14px] leading-[20px] font-semibold text-[#333F4E]">Shared with</p>
            <p className="text-[14px] leading-[20px] font-semibold text-[#A3B2C7]">
              {file.users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {file.users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-[14px] leading-[20px] font-semibold">{email}</p>
                <Button
                  onClick={() => onRemove(email)}
                  className="rounded-full bg-transparent text-[#333F4E] shadow-none hover:bg-transparent !important"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="aspect-square rounded-full !important"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};