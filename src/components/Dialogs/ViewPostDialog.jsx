import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "../ui/dialog";
import { motion } from "framer-motion";

const ViewPostDialog = ({ isOpen, onClose, post }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-6 border border-gray-300">
                <DialogTitle className="text-3xl font-extrabold text-center text-gray-700 mb-4">
                    View Detail
                </DialogTitle>

                <div className="flex flex-col items-center">
                    {post?.postPhotoUrl && (
                        <img
                            src={post.postPhotoUrl}
                            alt={post.title}
                            className="w-full h-60 object-cover rounded-lg mb-4 border border-gray-300"
                        />
                    )}
                    <p className="text-gray-600 text-center mb-4">{post?.description}</p>
                </div>

                <motion.button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-blue-500 hover:to-cyan-600 "
                >
                    Close
                </motion.button>

                <DialogClose asChild />
            </DialogContent>
        </Dialog>
    );
};

export default ViewPostDialog;
