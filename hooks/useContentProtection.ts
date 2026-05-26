import { useEffect } from 'react';

export const useContentProtection = () => {
    useEffect(() => {
        // Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+U, etc)
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+I (DevTools)
            if (e.ctrlKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }

            // Cmd+Shift+I (Mac DevTools)
            if (e.metaKey && e.shiftKey && e.key === 'I') {
                e.preventDefault();
                return false;
            }

            // Ctrl+Shift+C (Inspect Element)
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }

            // Cmd+Shift+C (Mac Inspect Element)
            if (e.metaKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }

            // Cmd+U (View Source Mac)
            if (e.metaKey && e.key === 'u') {
                e.preventDefault();
                return false;
            }

            // Cmd+S (Save)
            if (e.metaKey && e.key === 's') {
                e.preventDefault();
                return false;
            }
            // Ctrl+S (Save)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                return false;
            }
        };

        // Prevent Dragging Images
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, []);
};
