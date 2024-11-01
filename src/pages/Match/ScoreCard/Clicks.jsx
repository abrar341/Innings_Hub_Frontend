import React from 'react'
import { useOutletContext } from 'react-router-dom';
import { useGetPostsByMatchIdQuery } from '../../../slices/admin/adminApiSlice';

const Clicks = () => {
    const context = useOutletContext();
    let matchInfo = context;
    const matchId = matchInfo?._id;
    const { data } = useGetPostsByMatchIdQuery(matchId)
    const posts = data?.data;
    console.log(posts);

    return (
        <div className='p-4 dark:text-gray-300 '>
            <h2 className='text-xl dark:text-gray-300  font-extrabold uppercase mb-4'>Photos</h2>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {posts?.map((photo, index) => (
                    <div
                        key={index}
                        className="mb-4 break-inside-avoid bg-white shadow hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden group"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={photo?.postPhotoUrl}
                                alt={photo.description}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="px-4 py-2 bg-white dark:text-gray-300 dark:bg-gray-700">
                            <p
                                className=" text-xs f truncate"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {photo.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>





        </div>
    )
}

export default Clicks
