import React, { useState, useRef } from "react";

interface IInput {
    inputType: "email" | "password" | "cpf" | "text" | "submit",
    refInput?: React.RefObject<HTMLInputElement>,
}

const Input = ({inputType = "text", refInput }: IInput) => {
    const ref = useRef<HTMLInputElement>(null);
    const [labelState, setlabelState] = useState(false);
    const [key, setKey] = useState("");

    function handleFocus() {
        if(inputType !== "submit") {
            ref.current?.value;
            setlabelState(true);
        }
    }

    function handleBlur() {
        if(inputType !== "submit") {
            !ref.current?.value ? setlabelState(false) : setlabelState(true);
        }
    }

    function maskCpf(key: string) {
        
        const input = ref.current;

        const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace"];

        if(key in numberKeys) {
            if(( input?.value.length === 3 || input?.value.length === 7 ) && key !== "Backspace") {
                input.value = input.value + ".";
            }
            else if(input?.value.length === 11 && key !== "Backspace") {
                input.value = input.value + "-";
            }
        }
        else {
            if(input) {
                let array = input.value.split("");
                array.pop();
                const string = array.join("");

                input.value = string;
            }
        }

    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if(inputType === "cpf") {
            maskCpf(key);

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
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl ${inputType === "submit" ? "hidden" : null} ${inputType === "cpf" ? "uppercase" : "capitalize"}`} htmlFor={inputType}>{inputType}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input maxLength={inputType === "cpf" ? 14 : undefined} type={inputType} value={inputType === "submit" ? inputType : undefined} onChange={e => handleChange(e)} onKeyDown={e => setKey(e.key)} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className={` h-12 bg-slate-900/40 rounded-xl px-4 text-xl ${inputType === "submit" ? "cursor-pointer hover:bg-slate-900/60 transition-all" : null}`} id={inputType} />
        </div>
    );
}
 
export default Input;