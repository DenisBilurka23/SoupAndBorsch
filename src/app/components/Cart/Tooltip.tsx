import React, { forwardRef, useCallback, useEffect, useState } from 'react'

interface TooltipProps {
	text: string
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({ text }, parentRef) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false)

	const handleToggleTooltip = useCallback((show: boolean) => () => setShowTooltip(show), [])

	useEffect(() => {
		const element = (parentRef as React.MutableRefObject<HTMLDivElement | null>)?.current
		if (element) {
			element.addEventListener('mouseenter', handleToggleTooltip(true))
			element.addEventListener('mouseleave', handleToggleTooltip(false))
		}

		return () => {
			if (element) {
				element.removeEventListener('mouseenter', handleToggleTooltip(true))
				element.removeEventListener('mouseleave', handleToggleTooltip(false))
			}
		}
	}, [parentRef, handleToggleTooltip])

	return showTooltip ? (
		<span className="absolute left-1/2 transform -translate-x-1/2 -bottom-full bg-black text-white text-xs px-2 py-1 rounded mt-1 opacity-100 pointer-events-auto transition-opacity duration-300">
			{text}
		</span>
	) : null
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
