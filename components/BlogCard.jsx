// export default function BlogCard({ post }) {
//   const { title, excerpt, featuredImage, slug } = post;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {featuredImage && (
//         <Image
//           src={featuredImage}
//           alt={title}
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       )}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{title}</h3>
//         <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
//         <Link
//           href={`/blog/${slug}`}
//           className="text-blue-500 hover:underline text-sm"
//         >
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default function BlogCard({ post }) {
//   const { title, excerpt, slug } = post;
//   const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {featuredImage && (
//         <Image
//           src={featuredImage}
//           alt={title}
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       )}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">
//           {title?.rendered || "Untitled"}
//         </h3>
//         <p className="text-gray-600 text-sm mb-4">
//           {excerpt?.rendered || "No excerpt available."}
//         </p>
//         <Link
//           href={`/blog/${slug}`}
//           className="text-blue-500 hover:underline text-sm"
//         >
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// export default function BlogCard({ post }) {
//   const { title, excerpt, slug } = post;
//   const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {featuredImage && (
//         <Image
//           src={featuredImage}
//           alt={title.rendered}
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       )}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{title.rendered}</h3>
//         <p className="text-gray-600 text-sm mb-4">{excerpt.rendered}</p>

//         <Link
//           href={`/${slug}`}
//           className="text-sm text-blue-500 font-medium  flex items-center gap-1 justify-start group"
//         >
//           مشاهده همه
//           <ArrowLeft
//             size={14}
//             className="transition-all duration-200 group-hover:-translate-x-1"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// // Utility to strip HTML tags
// const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

// export default function BlogCard({ post }) {
//   const { title, excerpt, slug } = post;
//   const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {featuredImage && (
//         <Image
//           src={featuredImage}
//           alt={stripHtml(title.rendered)} // Clean HTML for alt text
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       )}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{stripHtml(title.rendered)}</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           {stripHtml(excerpt.rendered)}
//         </p>

//         <Link
//           href={`/${slug}`}
//           className="text-sm text-blue-500 font-medium flex items-center gap-1 justify-start group"
//         >
//           مشاهده همه
//           <ArrowLeft
//             size={14}
//             className="transition-all duration-200 group-hover:-translate-x-1"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// // Utility to strip HTML tags
// const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

// export default function BlogCard({ post }) {
//   const { title, excerpt, slug } = post;
//   const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {/* Featured Image */}
//       {featuredImage && (
//         <Image
//           src={featuredImage}
//           alt={stripHtml(title.rendered)} // Clean HTML for alt text
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       )}

//       {/* Blog Content */}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{stripHtml(title.rendered)}</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           {stripHtml(excerpt.rendered)}
//         </p>

//         {/* Link to Blog Page */}
//         <Link
//           href={`/${slug}`}
//           className="text-sm text-blue-500 font-medium flex items-center gap-1 justify-start group"
//         >
//           مشاهده همه
//           <ArrowLeft
//             size={14}
//             className="transition-all duration-200 group-hover:-translate-x-1"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";

// // Utility to strip HTML tags
// const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

// export default function BlogCard({ post }) {
//   const { title, excerpt, slug, featuredImage } = post;
//   // const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

//   return (
//     <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
//       {/* Featured Image */}
//       {featuredImage ? (
//         <image
//           src={featuredImage}
//           alt={stripHtml(title.rendered)}
//           width={400}
//           height={200}
//           className="w-full h-48 object-cover"
//         />
//       ) : (
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//           <p className="text-sm text-gray-500">No Image Available</p>
//         </div>
//       )}

//       {/* Blog Content */}
//       <div className="p-4">
//         <h3 className="text-lg font-bold mb-2">{stripHtml(title.rendered)}</h3>
//         <p className="text-gray-600 text-sm mb-4">
//           {stripHtml(excerpt.rendered)}
//         </p>

//         {/* Link to Blog Page */}
//         <Link
//           href={`/${slug}`}
//           className="text-sm text-blue-500 font-medium flex items-center gap-1 justify-start group"
//         >
//           مشاهده همه
//           <ArrowLeft
//             size={14}
//             className="transition-all duration-200 group-hover:-translate-x-1"
//           />
//         </Link>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Utility to strip HTML tags
const stripHtml = (html) => html.replace(/<[^>]*>/g, "");

export default function BlogCard({ post }) {
  const { title, excerpt, slug } = post;
  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url; // Ensure featuredImage is correctly extracted

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Featured Image */}
      {featuredImage ? (
        <Image
          src={featuredImage} // Corrected: Use `Image` from next/image
          alt={stripHtml(title.rendered)}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <p className="text-sm text-gray-500">No Image Available</p>
        </div>
      )}

      {/* Blog Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{stripHtml(title.rendered)}</h3>
        <p className="text-gray-600 text-sm mb-4">
          {stripHtml(excerpt.rendered)}
        </p>

        {/* Link to Blog Page */}
        <Link
          href={`/${slug}`}
          className="text-sm text-blue-500 font-medium flex items-center gap-1 justify-start group"
        >
          بیشتر بخوانید
          <ArrowLeft
            size={14}
            className="transition-all duration-200 group-hover:-translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
