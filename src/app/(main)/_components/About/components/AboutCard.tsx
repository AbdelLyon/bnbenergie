// "use client";

// import { LazyMotionArticle } from "@/components/LazyComponents";
// import { Heading } from "@/components/shared/ui/Heading";
// import type { BaseCardProps, IconCard } from "@/types";
// import { getLucideIcon } from "@/utils/getLucideIcon";

// interface AboutCardProps extends BaseCardProps, IconCard {}

// export function AboutCard({
//   icon,
//   title,
//   content,
//   stat,
//   statLabel,
//   index,
//   className,
// }: AboutCardProps) {
//   const Icon = getLucideIcon(icon);

//   return (
//     <LazyMotionArticle
//       initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true, margin: "-30px" }}
//       transition={{
//         duration: 0.35,
//         delay: 0,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className={`group relative h-full ${className || ""}`}
//     >
//       <div className="relative h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-10 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-neutral-300 dark:hover:border-neutral-700">
//         <div className="absolute inset-0 bg-linear-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

//         <div className="relative mb-8 inline-flex">
//           <div className="absolute inset-0 rounded-2xl bg-amber-500/30 blur-xl group-hover:bg-amber-500/40 transition-all duration-300" />
//           <div className="relative bg-linear-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 text-white mb-8 inline-flex rounded-2xl p-5 shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform duration-200">
//             <Icon className="h-8 w-8" />
//           </div>
//         </div>

//         <div className="absolute top-8 right-8">
//           <div className="text-right">
//             <div className="bg-linear-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-4xl font-black text-transparent">
//               {stat}
//             </div>
//             <div className="mt-1 text-xs font-bold text-amber-600/70 dark:text-amber-400/70 uppercase">
//               {statLabel}
//             </div>
//           </div>
//         </div>

//         {/* Titre et contenu */}
//         <Heading
//           as="h3"
//           className="group-hover:text-amber-700 dark:group-hover:text-amber-400 mb-5 text-2xl transition-colors duration-300"
//         >
//           {title}
//         </Heading>
//         <p className="leading-relaxed text-base opacity-70">{content}</p>
//       </div>
//     </LazyMotionArticle>
//   );
// }
