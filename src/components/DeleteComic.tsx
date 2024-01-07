import { Transition, Dialog } from "@headlessui/react";

const DeleteComic = ({
    deleteData,
    closeModal,
}: {
    deleteData: {
        id: number;
        title: string;
    }
    closeModal: () => void
}) => {


    return (
        <>
            <Transition appear show={!!deleteData} as="div">
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as="div"
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as="div"
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                                    >
                                        Confirm Delete
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                            Are you sure you want to delete <br /> <code className="dark:bg-zinc-700 dark:text-gray-100 bg-gray-200 text-gray-800 p-1">
                                                {deleteData.title}
                                            </code><br /> All the data will be
                                            permanently removed. This action
                                            cannot be undone.
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-sm font-medium text-gray-100 hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-800 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Delete
                                        </button>

                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent dark:bg-white bg-black text-gray-100 hover:bg-opacity-80 px-4 py-2 text-sm font-medium dark:text-gray-700 dark:hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default DeleteComic;
