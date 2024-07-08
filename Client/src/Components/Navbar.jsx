import { useState, useEffect, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, SearchIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/outline';
import Avatar from 'react-avatar';
import { useNavigate } from 'react-router-dom';

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'Store', href: '/about', current: false },
    { name: 'Contact', href: '/', current: false },
    { name: 'Seller', href: '#', current: false },
    { name: 'Avatar', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsername = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const username = await getUsernameFromToken(token);
                setUsername(username || '');
            } else {
                setUsername('');
            }
        };

        fetchUsername();
    }, []);

    const getUsernameFromToken = async (token) => {
        try {
            if (!token) {
                throw new Error('Token not found');
            }
            const [, payload] = token.split('.');
            const decodedPayload = atob(payload);
            const payloadObject = JSON.parse(decodedPayload);
            return payloadObject.username;
        } catch (error) {
            console.error('Error decoding token:', error);
            return '';
        }
    };

    const generateAvatar = () => {
        return username ? (
            <Avatar name={username} size="40" round={true} className="h-8 w-8" />
        ) : (
            <Avatar name="User" size="40" round={true} className="h-8 w-8" />
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsername('');
    };

    return (
        <Disclosure as="nav" className="bg-white">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="hidden lg:block h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                    alt="Workflow"
                                />
                            </div>

                            {/* Centered Navigation Links */}
                            <div className="hidden sm:block sm:ml-auto sm:mr-auto">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-red-500 text-white' : 'text-red-500 hover:bg-red-500 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-5 w-5" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            {/* Right Side Icons/Buttons */}
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                {/* First Box: Search, Heart, Cart, Profile Icons */}
                                <div className="flex space-x">
                                    {/* Search Icon */}
                                    <button
                                        type="button"
                                        className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
                                    >
                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {/* Heart Icon */}
                                    <button
                                        type="button"
                                        className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
                                    >
                                        <HeartIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {/* ShoppingCart Icon */}
                                    <button
                                        type="button"
                                        className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
                                    >
                                        <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                    {/* Profile Dropdown */}
                                    <Menu as="div" className="relative border-black-500 border-2">
                                        <div>
                                            <Menu.Button className="text-red-500 hover:bg-red-500 hover:text-white focus:outline-none">
                                                <UserCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-red-500 ring-opacity-75 focus:outline-none border-red-500">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <>
                                                            {username && (
                                                                <a
                                                                    href="/profile"
                                                                    className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                                >
                                                                    Your Profile
                                                                </a>
                                                            )}
                                                        </>
                                                    )}
                                                </Menu.Item>

                                                {username ? (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                onClick={handleLogout}
                                                                className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ) : (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/login"
                                                                className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                            >
                                                                Log in/Sign Up
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                )}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>

                            {/* Second Box: Login/Signup Button */}
                            <div className="hidden sm:ml-4 sm:flex">
                                {username ? (
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="border-4 border-red-500 inline-block bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white focus:outline-none"
                                    >
                                        Sign out
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => navigate('/login')}
                                        className="border-4 border-red-500 inline-block bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-500 hover:text-white focus:outline-none"
                                    >
                                        Log in
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-red-500 text-white' : 'text-red-500 hover:bg-red-500 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        {/* Mobile Icons */}
                        <div className="px-2 pt-2 pb-3 grid grid-cols-4 gap-2 border-t border-red-200">
                            <button
                                type="button"
                                className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none block text-center px-3 py-2 rounded-md text-base font-medium"
                            >
                                <SearchIcon className="h-5 w-5 mx-auto" aria-hidden="true" />
                                Search
                            </button>
                            <button
                                type="button"
                                className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none block text-center px-3 py-2 rounded-md text-base font-medium"
                            >
                                <HeartIcon className="h-5 w-5 mx-auto" aria-hidden="true" />
                                Heart
                            </button>
                            <button
                                type="button"
                                className="border-black-500 border-2 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none block text-center px-3 py-2 rounded-md text-base font-medium"
                            >
                                <ShoppingCartIcon className="h-5 w-5 mx-auto" aria-hidden="true" />
                                Cart
                            </button>
                            <Menu as="div" className="relative w-full border-black-500 border-2">
                                <div>
                                    <Menu.Button className="w-full text-red-500 hover:bg-red-500 hover:text-white focus:outline-none block text-center px-3 py-2 rounded-md text-base font-medium">
                                        <UserCircleIcon className="h-5 w-5 mx-auto" aria-hidden="true" />
                                        Profile
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-red-500 ring-opacity-75 focus:outline-none border-red-500">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <>
                                                    {username && (
                                                        <a
                                                            href="/profile"
                                                            className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </>
                                            )}
                                        </Menu.Item>

                                        {username ? (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        onClick={handleLogout}
                                                        className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ) : (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/login"
                                                        className={classNames(active ? 'bg-red-100 text-red-500' : 'text-gray-800', 'block px-4 py-2 text-sm')}
                                                    >
                                                        Log in/Sign Up
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        )}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
