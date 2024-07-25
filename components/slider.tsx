"use client";

import * as RadixSlider from "@radix-ui/react-slider"

interface SliderProps {
    value?: number,
    onChange?: (value: number) => void
}

const Slider: React.FC<SliderProps>= ({
    value = 1,
    onChange
}) => {
    const handleChange =(newValue: number[]) => {
        onChange?.(newValue[0]);
    }

    return (
        <RadixSlider.Root
            className="relative items-center flex w-16 cursor-pointer select-none touch-none h-10"
            defaultValue={[1]}
            value={[value]}
            onValueChange={handleChange}
            max={1}
            step={0.1}
            aria-label="Volume"
        >
            <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-1">
                <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="block w-2 h-2 bg-white rounded-full" />
        </RadixSlider.Root>
    );
}
 
export default Slider;