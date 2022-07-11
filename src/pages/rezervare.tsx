import SelectLocation from '@/assets/img/select_location.svg';
import Image from 'next/future/image';
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { Location } from '@prisma/client';
import { classNames } from '@/utils/helpers';

function LoadingSpinner() {
    return (
        <div className="mt-6 flex justify-center items-center">
            <svg
                className="animate-spin h-6 w-6 text-gray-900 dark:text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25 text-sky-500"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75 text-sky-500"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </div>
    );
}

export default function Rezervare() {
    const router = useRouter();
    const [selectedLocation, setSeletectedLocation] = useState<
        Location | undefined
    >();
    const locations = trpc.useQuery(['location.get-all'], {
        onSuccess: (data) => setSeletectedLocation(data[0]),
    });

    const handleClick = () => {
        router.push(`/rezervare/${selectedLocation?.id}`);
    };
    if (locations.isLoading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col justify-center items-center h-screen p-8">
            <div className="w-full flex flex-col items-center space-y-6">
                <Image priority src={SelectLocation} alt="Select Location" />
                <p className="text-gray-800  font-bold text-2xl leading-8">
                    Selectează locația:
                </p>
            </div>
            <div className="w-full lg:w-1/3">
                {locations.data?.length ? (
                    <RadioGroup
                        className={'mt-6 space-y-4'}
                        value={selectedLocation}
                        onChange={setSeletectedLocation}
                    >
                        {locations.data.map((loc) => (
                            <RadioGroup.Option
                                key={loc.id}
                                value={loc}
                                className={({ checked, active }) =>
                                    classNames(
                                        checked
                                            ? 'border-transparent'
                                            : 'border-gray-300',
                                        active
                                            ? 'border-sky-500 ring-2 ring-sky-500'
                                            : '',
                                        'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                                    )
                                }
                            >
                                {({ checked, active }) => (
                                    <>
                                        <div className="flex-1 flex">
                                            <div className="flex flex-col">
                                                <RadioGroup.Label
                                                    as="span"
                                                    className="block text-sm font-medium text-gray-900"
                                                >
                                                    {loc.name}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className="mt-1 flex items-center text-sm text-gray-500"
                                                >
                                                    {loc.street}
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        <CheckCircleIcon
                                            className={classNames(
                                                !checked ? 'invisible' : '',
                                                'h-5 w-5 text-sky-600'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <div
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked
                                                    ? 'border-sky-500'
                                                    : 'border-transparent',
                                                'absolute -inset-px rounded-lg pointer-events-none'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </RadioGroup>
                ) : (
                    <LoadingSpinner />
                )}
            </div>
            <button
                disabled={selectedLocation === undefined}
                onClick={handleClick}
                className="mt-6 w-full lg:w-1/3 p-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            >
                Continuă
            </button>
        </div>
    );
}
