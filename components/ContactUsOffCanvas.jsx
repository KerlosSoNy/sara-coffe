import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SocialIcons from "./SocialIcons";
import WhatsappIcon from "../public/assets/icons/whatsapp.svg";
import Image from "next/image";
import { Phone } from "lucide-react";

export function ContactUsOffCanva() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="text-white drop-shadow-lg">
          با ما در ارتباط باشید
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="">
        <SheetHeader className="py-10">
          <SheetTitle className="text-center md:mb-5  md:text-2xl text-xl">
            با ما در ارتباط باشید
          </SheetTitle>
          <SheetDescription className="text-center"></SheetDescription>
        </SheetHeader>
        <div className="flex flex-col md:flex md:flex-row gap-5 justify-between items-center">
          <div className="flex-1 place-items-center">
            <Link
              href="tel:02177706455"
              className="flex justify-center items-center bg-[#ffffff] gap-2 rounded-md py-1 px-1 w-[200px] "
            >
              <Phone className="text-black w-5 h-5" />
              <p className="font-medium text-black text-xl mt-1">02177706455</p>
            </Link>
          </div>
          <div className="flex-1 place-items-center">
            <Link
              href="/"
              className="flex justify-center items-between gap-2  rounded-md py-1 px-1 w-[200px] "
            >
              <Image src={WhatsappIcon} width={30} height={30} alt="whatsapp" />
              <p className="font-medium  text-xl mt-1">09013431456</p>
            </Link>
          </div>
          <div className="flex-1 place-items-center">
            <SocialIcons
              className={"flex justify-end items-center gap-5"}
              width={30}
              height={30}
            />
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
