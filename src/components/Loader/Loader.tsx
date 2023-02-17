import { Bars } from "react-loader-spinner";

export type LoaderProps = {
	color?: string
	height?: string | number;
	width?: string | number
}

export const Loader = ({ color = '#05c896', height, width }: LoaderProps): JSX.Element => {
	return (
		<div style={{
			alignItems: "center",
			display: "flex",
			justifyContent: "center",
			whiteSpace: "nowrap",
			width: "100%"
		}}>
			<Bars
				color={color}
				height={height}
				width={width}
				ariaLabel="loading..."
			/>
		</div>
	)
}
