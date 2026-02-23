import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode,
    variant?: "frost" | "forest" | "aurora" | "petroleumBlue",
}

const variantColors = {
    frost: "bg-white/10 backdrop-blur-[3px] border-r-1 border-white/50 rounded",
    forest: "bg-green-500/10 backdrop-blur-sm border-r-1 border-green-400/50 rounded",
    aurora: "bg-purple-500/10 backdrop-blur-sm border-r-1 border-purple-400/40 rounded",
    petroleumBlue: "bg-[#367588]/10 backdrop-blur-sm border-r-1 border-[#367588]/40 rounded"
}

export function GlassDiv({
    children,
    variant = "forest"
}: GlassCardProps) {

    return (
        <div className="flex items-center justify-center min-h-full w-full py-12 pb-24 px-4">
            <div className={cn("w-full max-w-xl px-10 py-10", variantColors[variant])}>
                {children}
            </div>
        </div>
    )
}
