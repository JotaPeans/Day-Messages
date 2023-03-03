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
        ref.current?.value;
        setlabelState(true);
    }

    function handleBlur() {
        !ref.current?.value ? setlabelState(false) : setlabelState(true);
    }

    function maskCpf(key: string) {
        
        const input = ref.current;

        //console.log(key);
        

        const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        if(key in numberKeys) {
            if(( input?.value.length === 3 || input?.value.length === 7 ) && key !== "Backspace") {
                input.value = input.value + ".";
            }
            else if(input?.value.length === 11 && key !== "Backspace") {
                input.value = input.value + "-";
            }
        }
        else {
            //TODO apagar ultimo digito
        }

    }

    function handleChange(e: React.KeyboardEvent<HTMLInputElement>) {
        const key = e.key;
        
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
            <label className={`absolute transition-all ${labelState ? " -translate-y-11" : null} left-4 text-xl ${inputType === "cpf" ? "uppercase" : "capitalize"}`} htmlFor={inputType}>{inputType}</label>
            <input className="hidden" ref={refInput} type="text" />
            <input maxLength={inputType === "cpf" ? 14 : undefined} type={inputType} onKeyDown={e => handleChange(e)} onBlur={handleBlur} onFocus={handleFocus} ref={ref} className=" h-12 bg-slate-900/40 rounded-xl px-4 text-xl" id={inputType} />
        </div>
    );
}
 
export default Input;