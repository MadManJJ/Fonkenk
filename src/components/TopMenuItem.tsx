import Link from "next/link";

export default function TopMenuItem ( {title, pageRef}:{ title:string, pageRef:string}){
    return (
        <Link href={pageRef} className="mx-2 flex items-center justify-center rounded-md  hover:bg-violet-300 hover:rounded-md focus:outline-2 focus:outline-offset-20 focus:outline-violet-500 active:bg-violet-700 text-lg text-blue-700 hover:text-blue-700 box-border bg-cover z-[20] shadow-lg py-4 px-2 ">
           {title}
        </Link>
    );
}