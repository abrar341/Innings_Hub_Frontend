import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useGetPostsByMatchIdQuery } from "../../../slices/admin/adminApiSlice";
import ViewPostDialog from "../../../components/Dialogs/ViewPostDialog";

const Clicks = () => {
    const context = useOutletContext();
    let matchInfo = context;
    const matchId = matchInfo?._id;
    const { data } = useGetPostsByMatchIdQuery(matchId);
    const posts = data?.data;

    // State for dialog visibility and selected post
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Handle opening the dialog with the selected post
    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-4 dark:text-gray-300">
            <h2 className="text-xl dark:text-gray-300 font-extrabold uppercase mb-4">Photos</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {posts?.map((photo, index) => (
                    <div
                        key={index}
                        onClick={() => handlePostClick(photo)}
                        className="cursor-pointer relative mb-4 break-inside-avoid bg-white shadow rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden">
                            <img
                                src={photo?.postPhotoUrl}
                                alt={photo.description}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Description */}
                        <div className="px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-700">
                            <p
                                className="text-xs truncate"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {photo.description}
                            </p>
                            <span className="text-xs text-gray-500 mt-2 block">
                                {new Date(photo.createdAt).toLocaleDateString([], {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}{" "}
                                at{" "}
                                {new Date(photo.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dialog for viewing the post */}
            {selectedPost && (
                <ViewPostDialog
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    post={selectedPost}
                />
            )}
        </div>
    );
};

export default Clicks;
