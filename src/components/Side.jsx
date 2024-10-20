import { useState, useEffect } from "react";
import MatchClickDialog from "./MathcClickDialog";

const Side = () => {
    const [open, setOpen] = useState(true);

    // Check screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpen(false); // Close sidebar on small screens
            } else {
                setOpen(true); // Open sidebar on larger screens
            }
        };

        // Initial check when the component mounts
        handleResize();

        // Add event listener to handle window resize
        window.addEventListener("resize", handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const Menus = [
        { title: "Dashboard", src: "Chart_fill" },
        { title: "Inbox", src: "Chat" },
        { title: "Accounts", src: "User", gap: true },
        { title: "Schedule ", src: "Calendar" },
        { title: "Search", src: "Search" },
        { title: "Analytics", src: "Chart" },
        { title: "Files ", src: "Folder", gap: true },
        { title: "Setting", src: "Setting" },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-purple hide-scrollbar  h-screen p-5 pt-8 relative duration-300 sticky top-0 overflow-y-auto`}
            >

                {/* Toggle Button */}
                <img
                    src="./src/assets/control.png"
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
                    border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />

                {/* Logo Section */}
                <div className="flex gap-x-4 items-center">
                    <img
                        src="./src/assets/logo.png"
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Designer
                    </h1>
                </div>

                {/* Menu Items */}
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                            ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}
                        >
                            <img src={`./src/assets/${Menu.src}.png`} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-7 overflow-y-auto">
                <h1 className="text-2xl font-semibold">Home Page</h1>
                <p>
                    {/* Add enough content here to make the page scrollable */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio bibendum, pharetra arcu at, vulputate lectus. Nulla facilisi. Integer varius consectetur neque non mollis. Duis convallis eros nec neque feugiat, nec vehicula enim tempor. Fusce in enim eget lectus tincidunt vehicula. Aenean consectetur velit nec felis auctor, et sodales felis tincidunt.
                </p>
                <p>
                    {/* Repeating content for demonstration */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec odio bibendum, pharetra arcu at, vulputate lectus. Nulla facilisi. Integer varius consectetur neque non mollis. Duis convallis eros nec neque feugiat, nec vehicula enim tempor. Fusce in enim eget lectus tincidunt vehicula. Aenean consectetur velit nec felis auctor, et sodales felis tincidunt.
                    <MatchClickDialog />
                </p>
                {/* Add more content as needed */}
            </div>
        </div>
    );
};

export default Side;
