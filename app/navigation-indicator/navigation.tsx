"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navigation({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  
  // 인디케이터 애니메이션을 위한 state
  const [activeItem, setActiveItem] = useState('');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // pathname이 변경될 때마다 activeItem 업데이트
  useEffect(() => {
    if (pathname.includes('/home')) {
      setActiveItem('/home');
    } else if (pathname.includes('/about')) {
      setActiveItem('/about');
    } else if (pathname.includes('/services')) {
      setActiveItem('/services');
    } else if (pathname.includes('/products')) {
      setActiveItem('/products');
    } else if (pathname.includes('/contact')) {
      setActiveItem('/contact');
    }
  }, [pathname]);
  
  // 활성 링크의 위치에 따라 인디케이터 이동
  useEffect(() => {
    const updateIndicator = () => {
      if (!navRef.current) return;
      
      if (activeItem && linkRefs.current[activeItem]) {
        const linkElement = linkRefs.current[activeItem];
        const navElement = navRef.current;
        
        if (linkElement && navElement) {
          const linkRect = linkElement.getBoundingClientRect();
          const navRect = navElement.getBoundingClientRect();
          
          setIndicatorStyle({
            left: linkRect.left - navRect.left,
            width: linkRect.width,
            opacity: 1,
          });
        }
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    };
    
    // activeItem 변경 시 업데이트
    updateIndicator();
    
    // 윈도우 리사이즈 시에도 업데이트
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeItem]);

  const navItems = [
    {
      href: '/home',
      label: 'Home'
    }, {
      href: '/about',
      label: 'About'
    }, {
      href: '/services',
      label: 'Services'
    }, {
      href: '/products',
      label: 'Products'
    }, {
      href: '/contact',
      label: 'Contact'
    }
  ]
  
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
        <div className="mb-[12px]">
          <p>활성 링크에 따라 인디케이터 이동</p>
        </div>
        <div ref={navRef} className="flex items-center gap-[16px] h-[32px] relative">
          {
            navItems.map((item) => (
              <Link href={'/navigation-indicator' + item.href} key={item.href}>
                <div
                  ref={(el) => {
                    linkRefs.current[item.href] = el;
                  }}
                  className={`cursor-pointer transition-colors flex items-center justify-center w-[110px] ${
                    activeItem === item.href
                      ? "text-blue-600"
                      : "text-stone-500 hover:text-blue-600"
                  }`}
                >
                  <span className="text-[16px]">{item.label}</span>
                </div>
              </Link>
            ))
          }
          {/* 움직이는 인디케이터 */}
          <div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-600 rounded-full transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
        </div>
        <div className="flex items-center w-full h-[100px]">
          {children}
        </div>
      </div>
    </div>
  );
}
