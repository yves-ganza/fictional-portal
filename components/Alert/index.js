import React from 'react'
import Link from 'next/link'

export default function Alert(props){

    return(
        <div className="h-screen w-full inset-0 overflow-y-auto">
            <div className="absolute w-full h-full inset-0 bg-gray-500 opacity-75">
            </div>
            <div className="min-h-screen px-4 text-center flex items-center justify-center">
                <div className="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg" role="dialog" aria-modal="true">
                    <div>
                        <div className="rounded-lg px-8 bg-white shadow">
                            <div className="bg-white dark:bg-gray-800 ">
                                <div className="text-center w-full mx-auto pb-12 pt-4 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                                    <h2 className="text-3xl font-extrabold text-red-500 dark:text-white sm:text-4xl">
                                        <span className="block pb-8">
                                            {props.status.split(':')[0]}
                                        </span>
                                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                            {props.status.split(':')[1]}
                                        </span>
                                    </h2>
                                    <div className="py-4 lg:mt-0 lg:flex-shrink-0">
                                        {/* Button */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}