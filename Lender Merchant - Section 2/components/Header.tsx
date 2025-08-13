import { Search, Bell, Settings, LayoutDashboard } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import svgPaths from "../imports/svg-byyt1ec1to";
import imgImage6 from "figma:asset/a716d9c40f6bd1da0d2ce7a6d5f5510bc7480025.png";

function LenderLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-7 w-6 relative">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 24 28"
        >
          <g>
            <path
              d={svgPaths.p15752ef2}
              fill="#143AD0"
            />
            <path
              d={svgPaths.p20789500}
              fill="#0029C9"
            />
          </g>
        </svg>
        <div className="absolute bottom-[16.58%] flex items-center justify-center left-[39.09%] right-0 top-0">
          <div className="flex-none h-[14.604px] rotate-[270deg] skew-x-[359.928deg] w-[23.338px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 15"
            >
              <g>
                <path
                  d={svgPaths.p21b09380}
                  fill="#143AD0"
                />
                <path
                  d={svgPaths.p9dc3000}
                  fill="#0029C9"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="absolute bottom-[20.53%] flex items-center justify-center left-[21.38%] right-[21.44%] top-[23.67%]">
          <div className="flex-none h-[12.871px] rotate-[340.874deg] skew-x-[358.863deg] w-[10.318px]">
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 11 13"
            >
              <g>
                <path
                  d={svgPaths.pc6a8a00}
                  fill="url(#paint0_linear_2_722)"
                />
                <path
                  d={svgPaths.p1a0b6000}
                  fill="#1F778D"
                />
              </g>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_2_722"
                  x1="5.20119"
                  x2="5.18854"
                  y1="0.00502355"
                  y2="12.8664"
                >
                  <stop stopColor="#333DFF" />
                  <stop offset="1" stopColor="#CDFF28" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="h-3.5 w-[63px]">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 63 14"
        >
          <g clipPath="url(#clip0_2_702)">
            <path
              d={svgPaths.ped29500}
              fill="#143AD0"
            />
          </g>
          <defs>
            <clipPath id="clip0_2_702">
              <rect fill="white" height="14" width="63" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

interface HeaderProps {
  onSearchChange?: (value: string) => void;
}

export function Header({ onSearchChange }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-11 py-[18px] border-b border-[#f4f4f4] shadow-[0px_0px_8.4px_0px_rgba(78,113,255,0.25)] bg-white">
      <LenderLogo />
      
      <div className="flex items-center gap-[33px]">
        {/* Search Bar */}
        <div className="relative">
          <Input
            placeholder="Enter Search Term"
            className="w-[345px] h-[45px] rounded-[47px] border-[#d5ddff] bg-white pl-[25px] pr-[60px] text-[12.8px] text-[#616fab] placeholder:text-[#616fab]"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <Search className="absolute right-[25px] top-1/2 -translate-y-1/2 h-[19px] w-[19px] text-black" />
        </div>
        
        {/* Navigation Icons */}
        <div className="flex items-center gap-[31px]">
          <Button variant="ghost" size="icon" className="h-[29px] w-[29px]">
            <LayoutDashboard className="h-[29px] w-[29px] text-[#00197B]" strokeWidth={1.5} />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-[29px]">
            <Bell className="h-7 w-[29px] text-[#00197B]" strokeWidth={1.5} />
          </Button>
          <Button variant="ghost" size="icon" className="h-[29px] w-[29px]">
            <Settings className="h-[29px] w-[29px] text-[#00197B]" strokeWidth={1.5} />
          </Button>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border-4 border-[#ecefff]">
            <AvatarImage src={imgImage6} alt="Erik Lamela" />
            <AvatarFallback>EL</AvatarFallback>
          </Avatar>
          <span className="text-[16px] font-medium text-[#00197b]">Erik Lamela</span>
        </div>
      </div>
    </header>
  );
}