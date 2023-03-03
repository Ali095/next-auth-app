import { CSSProperties, ReactNode } from 'react';
import { Bars } from "react-loader-spinner";

export type LoaderProps = {
	color?: string
	height?: string | number;
	width?: string | number
	style?: CSSProperties
	placement?: 'center' | 'left' | 'right'
	children?: ReactNode
}

export const Loader = ({ color = '#05c896', height, width, style, placement = 'center', children }: LoaderProps): JSX.Element => {
	return (
		<div style={{
			...style,
			alignItems: "center",
			display: "flex",
			justifyContent: placement,
			whiteSpace: "nowrap",
			width: "100%"
		}}>
			{placement === 'right' && children}
			<Bars
				color={color}
				height={height}
				width={width}
				ariaLabel="loading..."
			/>
			{placement === 'left' && children}
		</div>
	)
}
