import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export interface AlertOptions {
	dismissible?: boolean;
	closeLabel?: string;
	closeVariant?: string;
	transition?: boolean;
}

export interface AlertProps {
	type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
	heading?: boolean | string;
	content: string;
	options?: AlertOptions;
}

const defaultOptions: AlertOptions = {
	dismissible: true,
	closeLabel: 'Close',
	transition: true
}

export default function CustomAlert({ type = 'info', heading = false, content, options = defaultOptions }: AlertProps) {
	const [showAlert, setShowAlert] = useState(true);

	useEffect(() => {
		if (content)
			setShowAlert(true);
	}, [content]);

	return showAlert ? <Alert
		style={{ width: '100%' }}
		variant={type}
		onClose={() => setShowAlert(false)}
		dismissible={options.dismissible}
		closeLabel={options.closeLabel}
		closeVariant={options.closeVariant}
		transition={options.transition}
	>
		{heading && <Alert.Heading>{heading}</Alert.Heading>}
		<p>{content}</p>
	</Alert> : <></>
}
