import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogItem({ blog }) {
    return (
        // <div >
        //     <article
        //         className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
        //     >
        //         <span className="inline-block rounded bg-blue-600 p-2 text-white">
        //             <svg
        //                 xmlns="http://www.w3.org/2000/svg"
        //                 className="h-6 w-6"
        //                 fill="none"
        //                 viewBox="0 0 24 24"
        //                 stroke="currentColor"
        //             >
        //                 <path d="M12 14l9-5-9-5-9 5 9 5z" />
        //                 <path
        //                     d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        //                 />
        //                 <path
        //                     strokeLinecap="round"
        //                     strokeLinejoin="round"
        //                     strokeWidth="2"
        //                     d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
        //                 />
        //             </svg>
        //         </span>

        //         <a href="#">
        //             <h3 className="mt-0.5 text-lg font-medium text-gray-900">
        //                 {blog.title}
        //             </h3>
        //         </a>

        //         <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
        //             {blog.content}
        //         </p>

        //         <a
        //             href="#"
        //             className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
        //         >
        //             Find out more

        //             <span
        //                 aria-hidden="true"
        //                 className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
        //             >
        //                 &rarr;
        //             </span>
        //         </a>
        //     </article>
        // </div>
        <div className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm dark:bg-gray-900">

                <div className="flex items-center justify-between">
                    <span className="text-sm dark:text-gray-400">Jun 1, 2020</span>
                    <Link rel="noopener noreferrer" to={`/${blog.blogid}`} className="px-2 py-1 font-bold rounded dark:bg-violet-400 dark:text-gray-900">Javascript</Link>
                </div>

                <div className="mt-3">
                    <a rel="noopener noreferrer" href="#" className="text-2xl font-bold hover:underline">{blog.title}</a>
                    <p className="mt-2 line-clamp-3  ">{blog.content}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Link rel="noopener noreferrer" to={`/${blog.blogid}`} className="hover:underline dark:text-violet-400">Read more</Link>
                    <div>
                        <a rel="noopener noreferrer" href="#" className="flex items-center">
                            <img src="https://source.unsplash.com/50x50/?portrait" alt="avatar" className="object-cover w-10 h-10 mx-4 rounded-full dark:bg-gray-500" />
                            <span className="hover:underline dark:text-gray-400">{blog.username}</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}
