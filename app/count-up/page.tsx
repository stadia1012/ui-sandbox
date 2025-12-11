"use client";

import Link from "next/link";
import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

// 카운트업 애니메이션 컴포넌트
function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, target, {
      duration,
      // 옵션 1: circOut - 원형 곡선으로 끝부분이 더 부드러움
      // ease: "circOut",
      
      // 옵션 2: 커스텀 cubic-bezier
      // ease: [0, 0.55, 0.45, 1],
      // ease: [0.9, 0.58, 0.36, 1],
      // ease: [0.99, 0.01, 0.001, 1],
      
      // 옵션 3: backOut - 타겟을 살짝 넘었다가 돌아오는 효과
      // ease: "backOut",

      // 옵션 4: easeInOut - 시작과 끝이 모두 부드럽게
      ease: "easeInOut",
    });

    return controls.stop;
  }, [count, target, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return unsubscribe;
  }, [rounded]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function CountUpPage() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [customerCount, setCustomerCount] = useState(1234);
  const [projectCount, setProjectCount] = useState(5678);

  const handleStart = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

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
        <div className="mb-[36px]">
          <h1 className="text-[22px] font-bold">카운트업 효과 <span className="text-[18px] font-normal">(Framer Motion)</span></h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          {/* 카운트업 예시 */}
          <div className="flex flex-col gap-2 text-center border border-gray-300 rounded-[12px] px-[120px] py-[36px] shadow-md">
            <div className="text-[42px] font-bold text-gray-800">
              검증된{" "}
              <span className="
                text-transparent bg-clip-text
                bg-gradient-to-r from-blue-600 to-blue-500/85 selection:text-white
              ">
                {isAnimating ? <CountUp target={customerCount} duration={1} /> : 0}
              </span>
              개의 고객사
            </div>

            <div className="text-[42px] font-bold text-gray-800">
              성공한{" "}
              <span className="
                text-transparent bg-clip-text
                bg-gradient-to-r from-green-600 to-green-500/90 selection:text-white
              ">
                {isAnimating ? <CountUp target={projectCount} duration={1} /> : 0}
              </span>
              개의 프로젝트
            </div>
          </div>

          {/* 컨트롤 패널 */}
          <div className="flex flex-col gap-4 items-center mt-8">
            <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                <label className="text-[14px] font-semibold" htmlFor="customerCount">고객사:</label>
                <input
                  type="number"
                  value={customerCount}
                  id="customerCount"
                  onChange={(e) => setCustomerCount(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded-lg w-[100px] text-center focus:border-blue-400 outline-none"
                  min="0"
                />
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[14px] font-semibold" htmlFor="projectCount">프로젝트:</label>
                <input
                  id="projectCount"
                  type="number"
                  value={projectCount}
                  onChange={(e) => setProjectCount(Number(e.target.value))}
                  className="px-2 py-1 border border-gray-300 rounded-lg w-[100px] text-center focus:border-blue-400 outline-none"
                  min="0"
                />
              </div>
            </div>
            <button
              onClick={handleStart}
              className="
                px-7 py-2 bg-blue-500 text-white rounded-lg text-[16px] font-[500]
                hover:bg-blue-600/90 transition-colors shadow-sm cursor-pointer
              ">
              Animate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}