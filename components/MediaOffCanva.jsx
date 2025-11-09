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
import { ArrowLeft } from "lucide-react";

export function MediaOffCanva() {
  return (
    <Sheet className="">
      <SheetTrigger asChild>
        <Button variant="ghost">رسانه</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="py-10">
          <SheetTitle className="text-center ">رسانه</SheetTitle>
          <SheetDescription className="text-center ">
            اخبار، مقالات و بلاگ
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-10">
          <Link href="/media/news">
            <div className="w-full h-[200px] bg-slate-600 flex justify-center items-center rounded-md">
              <p className="font-medium text-white text-xl">اخبار</p>
            </div>
          </Link>
          <Link href="/media/tutorial">
            <div className="w-full h-[200px] bg-slate-600 flex justify-center items-center rounded-md">
              <p className="font-medium text-white text-xl">بلاگ آموزشی</p>
            </div>
          </Link>
          <Link href="/media/blog">
            <div className="w-full h-[200px] bg-slate-600 flex justify-center items-center rounded-md">
              <p className="font-medium text-white text-xl">بلاگ</p>
            </div>
          </Link>
          <Link
            href="/media"
            className="text-sm text-blue-500 font-medium  flex items-center gap-1 justify-center group"
          >
            مشاهده همه
            <ArrowLeft
              size={14}
              className="transition-all duration-200 group-hover:-translate-x-1"
            />
          </Link>
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
