"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductPdf({ pdfs }) {
  if (!pdfs || pdfs.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="pdf">
        <AccordionTrigger>راهنمای محصول (PDF)</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc px-4 space-y-2">
            {pdfs.map((file, index) => (
              <li key={index}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {file.title || file.name || `فایل ${index + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
