import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "../components/ui/dialog";
import toast from "react-hot-toast";
import useDialog from "../hooks/useDialog";
import { useVerifyEmailMutation } from "../slices/auth/usersApiSlice";
import { useNavigate } from "react-router-dom";

const EmailVerificationDialog = ({ email, setEmail }) => {
    console.log(email);

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const [verifyEmail, { isLoading, isError, error, isSuccess }] = useVerifyEmailMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            const res = await verifyEmail({ email, code: verificationCode }).unwrap();
            console.log(res);
            toast.dismiss()
            toast.success("Email verified successfully!");
            setEmail("");
            setCode(["", "", "", "", "", ""]);
            navigate('/account/login'); // Navigate on success
            closeVerifyDialog()
        } catch (err) {
            console.log(err);
            toast.dismiss()
            toast.error(err?.data?.message || "Error Occurred");
        }
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    const { closeVerifyDialog, isVerifyDialogOpen } = useDialog();

    return (
        <Dialog open={isVerifyDialogOpen} onOpenChange={() => {
            closeVerifyDialog();
            setCode(["", "", "", "", "", ""])
        }}>
            <DialogContent className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
                <DialogTitle className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                    Verify Your Email
                </DialogTitle>
                <p className="text-center text-gray-300 mb-6">Enter the 6-digit code sent to<span className="font-bold text-base bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}  // Disable button when loading
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}  {/* Display loading text */}
                    </motion.button>
                </form>

                <DialogClose asChild>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
};

export default EmailVerificationDialog;
