import { HexColorPicker } from "react-colorful";
import { useState, useRef, useEffect } from "react";
import { CustomField } from "@measured/puck";

// Export the Component directly for use in 'render'
export const ColorPicker = ({ value, onChange }: { value?: string, onChange: (val: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popover = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popover.current && !popover.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative">
            <div className="flex gap-2 items-center">
                <div
                    className="w-8 h-8 rounded border border-slate-300 cursor-pointer shadow-sm transistion-transform hover:scale-105"
                    style={{ backgroundColor: value || "#ffffff" }}
                    onClick={() => setIsOpen(!isOpen)}
                />
                <input
                    type="text"
                    value={value || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 p-1.5 border border-slate-200 rounded text-xs font-mono text-slate-600 focus:outline-none focus:border-blue-500"
                    placeholder="#ffffff"
                />
            </div>

            {isOpen && (
                <div ref={popover} className="absolute top-10 left-0 z-50 p-2 bg-white rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-slate-100">
                    <HexColorPicker color={value || "#ffffff"} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
