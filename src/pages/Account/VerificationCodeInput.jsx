import React, { useState } from 'react';

const VerificationCodeInput = ({ length = 6, onComplete }) => {
    const [code, setCode] = useState(Array(length).fill(''));

    const handleChange = (e, index) => {
        const newCode = [...code];
        newCode[index] = e.target.value;
        setCode(newCode);

        // Move focus to the next input field
        if (e.target.value.length === 1 && index < length - 1) {
            document.getElementById(`code-${index + 1}`).focus();
        }

        // Call onComplete callback if all fields are filled
        if (newCode.every(char => char !== '') && newCode.length === length) {
            onComplete(newCode.join(''));
        }
    };

    return (
        <div className='flex flex-col justify-center gap-4  items-center  min-h-[200px]'>
            <div className='text-xl text-gray-600 font-bold border-b border-gray-200 p-3'>VERIFICATION CODE:</div>
            <div className="flex justify-center items-center space-x-2">
                {code.map((char, index) => (
                    <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength="1"
                        value={char}
                        onChange={(e) => handleChange(e, index)}
                        className="w-12 h-12 text-center text-xl border border-gray-400 rounded focus:outline-none focus:border-blue-500"
                    />
                ))}
            </div>
        </div>
    );
};

export default VerificationCodeInput;
