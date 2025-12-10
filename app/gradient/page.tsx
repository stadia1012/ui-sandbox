"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// 체크 아이콘 컴포넌트
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check w-6 h-6 text-green-600 mx-auto"
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
  );
}

// 테이블 더미 데이터
const platforms = [
  { name: "Lorem Ipsum", color: "from-slate-400 via-slate-500 to-slate-600", category: "카테고리 A", description: "Lorem ipsum dolor sit amet consectetur adipiscing" },
  { name: "Dolor Sit", color: "from-blue-400 via-indigo-500 to-indigo-600", category: "카테고리 B", description: "Sed do eiusmod tempor incididunt ut labore et dolore" },
  { name: "Amet Cons", color: "from-cyan-400 via-teal-500 to-teal-600", category: "카테고리 C", description: "Ut enim ad minim veniam quis nostrud exercitation" },
  { name: "Adipiscing", color: "from-indigo-400 via-purple-500 to-purple-600", category: "카테고리 D", description: "Duis aute irure dolor in reprehenderit in voluptate" },
  { name: "Eiusmod", color: "from-sky-400 via-blue-500 to-blue-600", category: "카테고리 E", description: "Excepteur sint occaecat cupidatat non proident" },
  { name: "Tempor Inc", color: "from-teal-400 via-cyan-500 to-cyan-600", category: "카테고리 F", description: "Sunt in culpa qui officia deserunt mollit anim" },
];

export default function GradientTable() {
  return (
    <div className="px-[32px] py-[16px]">
      {/* back button */}
      <div className="mb-[12px]">
        <Link href="/">
          <div className="text-[14px] flex items-center hover:text-gray-500 transition-colors hover-underline">
            <span className="text-[10px] mr-[4px]">◀</span>
            <span className="">Home</span>
          </div>
        </Link>
      </div>
      <div className="min-w-[800px] max-w-[1200px] mx-auto">
        {/* title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}      // 초기 상태: 투명하고 아래에 위치
          whileInView={{ opacity: 1, y: 0 }}   // 화면에 보일 때: 불투명하고 제자리로
          viewport={{ once: false }}           // once: true면 한 번만 실행, false면 반복
          transition={{
            ease: "easeIn",
            duration: 0.45,
            y: { duration: 0.45 },
          }}
        >
          <div className="mb-[18px]">
            <h1 className="
              text-[40px] font-[700]
              selection:text-white leading-[1.1]
            ">
              <span className="
                text-transparent bg-clip-text
                bg-gradient-to-r from-blue-700 to-blue-400/90
                hover:from-blue-400/90 hover:to-blue-700 transition-colors duration-400
              ">Gradient Table</span>
            </h1>
            <p className="
              text-[16px] font-[400]
              selection:text-white leading-[1.1]"
            >
              <span className="
                text-transparent bg-clip-text
                bg-gradient-to-r from-gray-900 to-gray-500
                hover:from-gray-500 hover:to-gray-900 transition-colors duration-400
              ">This is a gradient table example using Tailwind CSS.</span>
            </p>
          </div>
        </motion.div>
        {/* table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}      // 초기 상태: 투명하고 아래에 위치
          whileInView={{ opacity: 1, y: 0 }}   // 화면에 보일 때: 불투명하고 제자리로
          viewport={{ once: false }}           // once: true면 한 번만 실행, false면 반복
          transition={{
            delay: 0.3,
            ease: "easeIn",
            duration: 0.45,
            y: { delay: 0.3, duration: 0.45 },
          }}
        >
          <div className="overflow-hidden border border-gray-200 rounded-[12px]">
            <table className="w-full">
              <thead>
                <tr className="
                  bg-gradient-to-r from-blue-600 to-blue-500/90
                  hover:from-blue-500/90 hover:to-blue-600
                  text-white transition-colors duration-400
                  ease-in-out text-[15px]
                ">
                  <th className="px-4 py-3 text-left font-bold">플랫폼</th>
                  <th className="px-4 py-3 text-left font-bold">분류</th>
                  <th className="px-4 py-3 text-left font-bold">주요 기능</th>
                  <th className="px-4 py-3 text-center font-bold">체험</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((platform) => (
                  <tr
                    key={platform.name}
                    className="border-b border-border border-gray-300 hover:bg-blue-100/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${platform.color}`}></div>
                        <span className="font-[500] text-[16px]">{platform.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="
                        inline-block px-3 py-1
                        bg-gradient-to-br from-blue-400/10 to-blue-600/20
                        hover:from-purple-400/10 hover:to-purple-600/20
                        rounded-full text-[13px] font-[500] text-blue-800 transition-colors
                        cursor-pointer
                      ">
                        {platform.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[14px] text-gray-600">{platform.description}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <CheckIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
