// "use client";

// import { useEffect, useState } from "react";

// function convertEnglishToPersianDigits(input) {
//   const persianDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
//   return input.replace(/\d/g, (d) => persianDigits[d]);
// }

// export default function ProductPriceDisplay({ priceHtml, fallbackPrice }) {
//   const [localizedHtml, setLocalizedHtml] = useState("");
//   const [hasSale, setHasSale] = useState(false);

//   useEffect(() => {
//     const htmlToUse = priceHtml || fallbackPrice;
//     const div = document.createElement("div");
//     div.innerHTML = htmlToUse;

//     // Check for <del> tag to determine if it's a sale
//     setHasSale(!!div.querySelector("del"));

//     // Convert numbers to Persian
//     const walker = document.createTreeWalker(div, NodeFilter.SHOW_TEXT);
//     while (walker.nextNode()) {
//       walker.currentNode.nodeValue = convertEnglishToPersianDigits(
//         walker.currentNode.nodeValue
//       );
//     }

//     setLocalizedHtml(div.innerHTML);
//   }, [priceHtml, fallbackPrice]);

//   return (
//     <div
//       className={`text-left text-sm font-montserrat
//         [&>del]:text-sm
//         [&>del]:text-black
//         &>del]:font-medium
//         [&>del]:line-through
//         [&>del]:no-underline
//         [&>del]:block

//         [&>ins]:text-base
//         [&>ins]:${
//           hasSale ? "font-bold text-red-500" : "font-medium text-black"
//         }
//         [&>ins]:no-underline
//         [&>ins]:block

//         [&>span.screen-reader-text]:sr-only`}
//       dangerouslySetInnerHTML={{ __html: localizedHtml }}
//     />
//   );
// }

"use client";

import { useEffect, useState } from "react";

export default function ProductPriceDisplay({ priceHtml, fallbackPrice }) {
  const [html, setHtml] = useState("");
  const [hasSale, setHasSale] = useState(false);

  useEffect(() => {
    const htmlToUse = priceHtml || fallbackPrice;
    const div = document.createElement("div");
    div.innerHTML = htmlToUse;

    // Check for <del> tag to detect sale
    setHasSale(!!div.querySelector("del"));

    setHtml(div.innerHTML); // Use as-is
  }, [priceHtml, fallbackPrice]);

  return (
    <div
      className={`text-left text-sm font-montserrat
        [&>del]:text-sm [&>del]:text-black [&>del]:font-medium [&>del]:line-through [&>del]:block
        [&>ins]:text-base [&>ins]:${
          hasSale ? "font-bold text-red-500" : "font-medium text-black"
        } [&>ins]:no-underline [&>ins]:block
        [&>span.screen-reader-text]:sr-only`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
