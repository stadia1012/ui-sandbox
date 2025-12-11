import Link from "next/link";

export default function Home() {
  return (
    <div className="px-[32px] py-[16px]">
      <ul className="flex flex-col justify-center py-5 px-6 list-disc gap-[5px]">
        <li className="text-[15px] hover:text-gray-500 transition-colors">
          <Link href="/gradient" className="hover-underline">Gradient Color (Table)</Link>
        </li>
        <li className="text-[15px] hover:text-gray-500 transition-colors">
          <Link href="/count-up" className="hover-underline">Count up</Link>
        </li>
        <li className="text-[15px] hover:text-gray-500 transition-colors">
          <Link href="/navigation-indicator" className="hover-underline">Navigation Indicator</Link>
        </li>
      </ul>
    </div>
  );
}