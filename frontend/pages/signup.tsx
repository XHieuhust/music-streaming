import { Icon } from '@iconify/react'
import TextInput from '@/components/TextInput';
import PasswordInput from '@/components/PasswordInput';
import Link from 'next/link';

const SignupComponent = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
                <Link href="/"><Icon icon="logos:spotify" width="150" /></Link>
            </div>
            <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
                <div className="font-bold mb-4 text-2xl">
                    Sign up for free to start listening.
                </div>
                <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    className="my-6"
                />
                <TextInput
                    label="Confirm Email Address"
                    placeholder="Enter your email again"
                    className="mb-6"
                />
                <TextInput
                    label="Username"
                    placeholder="Enter your username"
                    className="mb-6"
                />
                <PasswordInput
                    label="Create Password"
                    placeholder="Enter a strong password here"
                />
                <div className="w-full flex justify-between items-center space-x-8">
                    <TextInput
                        label="First Name"
                        placeholder="Enter Your First Name"
                        className="my-6"
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Enter Your Last Name"
                        className="my-6"
                    />
                </div>
                <div className=" w-full flex items-center justify-center     my-8">
                    <button
                        className="bg-signature-color font-semibold p-3 px-10 rounded-full"
                    >
                        Sign Up
                    </button>
                </div>
                <div className="w-full border border-solid border-gray-300"></div>
                <div className="my-6 font-semibold text-lg">
                    Already have an account?
                </div>
                <div className="border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-bold">
                    <Link href="/login">LOG IN INSTEAD</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupComponent;
