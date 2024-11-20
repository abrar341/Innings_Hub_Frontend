import React, { useState, useEffect } from "react";
import { useGetPaginatedPostsQuery } from "../slices/match/matchApiSlice";
import { Spinner } from "flowbite-react";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [filter, setFilter] = useState("all"); // For filtering posts
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const { data, isFetching } = useGetPaginatedPostsQuery({ skip, limit });

    useEffect(() => {
        if (data) {
            setPosts((prevPosts) => [...prevPosts, ...data?.data?.posts]);
            setHasMore(data?.data.hasMore);
        }
    }, [data]);

    useEffect(() => {
        // Apply filters whenever the posts or filter changes
        if (filter === "all") {
            setFilteredPosts(posts);
        } else if (filter === "today") {
            const today = new Date().toISOString().split("T")[0];
            setFilteredPosts(
                posts.filter((post) => post.createdAt.startsWith(today))
            );
        } else if (filter === "last7days") {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            setFilteredPosts(
                posts.filter((post) => new Date(post.createdAt) >= oneWeekAgo)
            );
        } else if (filter === "thisMonth") {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth(); // 0-based index
            const currentYear = currentDate.getFullYear();
            setFilteredPosts(
                posts.filter((post) => {
                    const postDate = new Date(post.createdAt);
                    return (
                        postDate.getMonth() === currentMonth &&
                        postDate.getFullYear() === currentYear
                    );
                })
            );
        } else if (filter === "imagesOnly") {
            setFilteredPosts(posts.filter((post) => !!post.postPhotoUrl));
        }
    }, [posts, filter]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >=
            document.documentElement.scrollHeight
        ) {
            if (!isFetching && hasMore) {
                setSkip((prevSkip) => prevSkip + limit);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isFetching, hasMore]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedPost(null);
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    return (
        <div className="p-4 dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-xl font-extrabold uppercase mb-4">Gallery/Posts</h2>

            {/* Filter Dropdown */}
            <div className="mb-4">
                <label htmlFor="filter" className="mr-2 font-bold">
                    Filter:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={handleFilterChange}
                    className="p-2 border border-gray-300 rounded dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                >
                    <option value="all">All Posts</option>
                    <option value="today">Today's</option>
                    <option value="last7days">Last 7 Days</option>
                    <option value="thisMonth">This Month</option>
                </select>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPosts.map((post) => (
                    <div
                        key={post._id}
                        onClick={() => handlePostClick(post)}
                        className="relative cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:hover:shadow-gray-600"
                    >
                        <img
                            src={post?.postPhotoUrl}
                            alt={post?.description}
                            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="p-3">
                            <p className="text-sm text-gray-700 truncate dark:text-gray-300">
                                {post?.description}
                            </p>
                            <span className="block text-xs text-gray-500 mt-1 dark:text-gray-400">
                                {new Date(post?.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {isFetching && (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner size="xl" /> {/* Loading spinner */}
                </div>
            )}

            {!hasMore && (
                <p className="text-center mt-4 dark:text-gray-400">No more posts available.</p>
            )}

            {/* Dialog */}
            {isDialogOpen && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md dark:bg-gray-800 dark:text-gray-100">
                        <h3 className="text-lg font-bold mb-4">{selectedPost.description}</h3>
                        <img
                            src={selectedPost.postPhotoUrl}
                            alt={selectedPost.description}
                            className="w-full h-60 object-cover rounded-md mb-4"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Posted on: {new Date(selectedPost.createdAt).toLocaleString()}
                        </p>
                        <button
                            onClick={closeDialog}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Posts;
