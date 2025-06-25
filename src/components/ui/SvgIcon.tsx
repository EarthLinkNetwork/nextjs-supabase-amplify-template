import React from 'react'

interface SvgIconProps {
  size?: 'sm' | 'base' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

const sizeMap = {
  sm: 'w-3 h-3',
  base: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

const pixelSizeMap = {
  sm: 12,
  base: 16,
  md: 20,
  lg: 24
}

export function SvgIcon({ size = 'base', className = '', children }: SvgIconProps) {
  const sizeClass = sizeMap[size]
  const pixelSize = pixelSizeMap[size]
  
  return (
    <div 
      className={`inline-flex items-center justify-center flex-shrink-0 ${sizeClass} ${className}`}
      style={{ 
        width: `${pixelSize}px`, 
        height: `${pixelSize}px`,
        minWidth: `${pixelSize}px`,
        minHeight: `${pixelSize}px`,
        maxWidth: `${pixelSize}px`,
        maxHeight: `${pixelSize}px`
      }}
    >
      {React.cloneElement(children as React.ReactElement, {
        className: `${sizeClass} flex-shrink-0`,
        style: { 
          width: `${pixelSize}px`, 
          height: `${pixelSize}px`,
          minWidth: `${pixelSize}px`,
          minHeight: `${pixelSize}px`,
          maxWidth: `${pixelSize}px`,
          maxHeight: `${pixelSize}px`
        }
      })}
    </div>
  )
}