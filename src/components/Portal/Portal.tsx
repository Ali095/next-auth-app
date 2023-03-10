
import { useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute("id", wrapperId);
    wrapperElement.style.position = 'fixed';
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

export const Portal = ({ children, wrapperId = "react-portal-wrapper" }: { children: ReactNode, wrapperId: string }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;
        // if element is not found with wrapperId or wrapperId is not provided,
        // create and append to body
        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }
        setWrapperElement(element);

        return () => {
            // delete the programmatically created element
            if (systemCreated && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [wrapperId]);

    // wrapperElement state will be null on very first render.
    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
}
