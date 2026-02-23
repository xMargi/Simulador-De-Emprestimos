import { Calculator } from "lucide-react"
import styles from "./glassButton.module.css"
import { cn } from "@/lib/utils"

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode
}

export function GlassButton({ children, className, ...props }: GlassButtonProps) {
    return (
        <button className={cn(styles.glassButton, className)} {...props}>
            <Calculator size={18} />
            {children ?? "Calcular"}
        </button>
    )
}
