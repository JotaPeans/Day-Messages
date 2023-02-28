import React, { useState, useRef } from "react";

interface IInput {
    inputType: "email" | "password" | "cpf" | "text" | "submit",
    refInput?: React.RefObject<HTMLInputElement>,
}

const Input = ({inputType = "text", refInput }: IInput) => {
    const ref = useRef<HTMLInputElement>(null);
    const [labelState, setlabelState] = useState(false);

    function handleFocus() {
        ref.current?.value;
        setlabelState(true);
    }

    function handleBlur() {
        !ref.current?.value ? setlabelState(false) : setlabelState(true);
    }

    function maskCpf() {
        const input = ref.current;

        if(input?.value.length === 3 || input?.value.length === 7) {
            input.value = input.value + ".";
        }
        else if(input?.value.length === 11) {
            input.value = input.value + "-";
        }  
    }

    function handleChange() {
        if(inputType === "cpf") {
            maskCpf();

            if(refInput?.current && ref.current) {
                refInput.current.value = ref.current.value.replace(/\D/g, "");
            }
            return
        }

        if(refInput?.current && ref.current) {
            refInput.current.value = ref.current.value;
        }
    }

    return (
        <div className="flex flex-col justify-center relative">
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl ${inputType === "cpf" ? "uppercase" : "capitalize"}`} htmlFor={inputType}>{inputType !== "submit" ? inputType : null}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input maxLength={inputType === "cpf" ? 14 : undefined} value={inputType === "submit" ? inputType : undefined} type={inputType} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className={` h-12 bg-slate-900/40 rounded-xl px-4 text-xl ${inputType === "submit" ? "cursor-pointer hover:bg-slate-900/70 transition-all" : null}`} id={inputType} />
        </div>
    );
}
 
export default Input;