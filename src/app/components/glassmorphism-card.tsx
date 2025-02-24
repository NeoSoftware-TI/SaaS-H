import type React from "react"
import type { ReactNode } from "react"

interface GlassmorphismCardProps {
  children: ReactNode
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({ children }) => {
  return (
    <div className="backdrop-blur-md bg-white bg-opacity-10 rounded-3xl p-8 shadow-lg border border-white border-opacity-20">
      {children}
    </div>
  )
}

export default GlassmorphismCard

