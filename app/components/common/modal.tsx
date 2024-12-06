import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

export function useDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };
  const closeDialog = () => setIsOpen(false);

  return { isOpen, openDialog, closeDialog };
}
interface ModalProps {
  isOpen: boolean;
  closeDialog: () => void;
}
export function Modal({ isOpen, closeDialog }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[90px]" />
        </Transition.Child>

        <div className="fixed inset-0 flex flex-col items-center justify-center p-4 gap-8">
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transition-transform duration-300"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="max-w-xl space-y-4 border bg-white dark:bg-white/5  p-12 rounded-lg shadow-md flex flex-col gap-4">
              <DialogTitle className="text-center text-light-80 dark:text-dark-80 text-sm font-medium font-roobertMono uppercase leading-3 tracking-wide">
                How to find your Team ID or URL?
              </DialogTitle>
              <ol
                className="self-stretch text-center list-decimal list-inside space-y-3"
                type="1"
              >
                <li className="text-light-90 dark:text-dark-90 text-base font-normal font-roobert leading-normal tracking-tight">
                  Log in to your Draft Fantasy Premier League account.
                </li>
                <li className="text-light-90 dark:text-dark-90 text-base font-normal font-roobert leading-normal tracking-tight">
                  Go to the Points page by clicking on the points tab in the
                  menu.
                </li>
                <li className="text-light-90 dark:text-dark-90 text-base font-normal font-roobert leading-normal tracking-tight">
                  Copy the URL from your browser's address bar. It will look
                  like this:{" "}
                  <span className="text-light-60 dark:text-dark-60 text-base font-normal font-roobert leading-normal tracking-tight">
                    <a
                      target={"_blank"}
                      href={
                        "https://draft.premierleague.com/entry/123456/event/11"
                      }
                    >
                      {" "}
                      https://draft.premierleague.com/entry/123456/event/11
                    </a>
                  </span>
                </li>
                <li className="text-light-90 dark:text-dark-90 text-base font-normal font-roobert leading-normal tracking-tight">
                  Paste this URL into the input box above, or extract the Team
                  ID(e.g.,123456) and enter it directly.
                  <br />
                </li>{" "}
              </ol>
              <div className={"m-auto"}>
                <span className="text-light-90 dark:text-dark-90 text-base font-normal font-roobert leading-normal tracking-tight">
                  Need more help? Visit{" "}
                  <span className="text-light-dark-blue text-base font-normal font-roobert leading-normal tracking-tight">
                    <a
                      href="https://draft.premierleague.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      the official Draft Premier League website.{" "}
                    </a>
                  </span>
                </span>
              </div>
            </DialogPanel>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="translate-y-4 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition-transform duration-300"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="translate-y-4 opacity-0"
          >
            <button className="w-[66px] h-[66px] px-8 py-8 bg-[#030303] dark:bg-white rounded-2xl justify-center items-center flex shadow">
              <div className="w-5 h-5 relative">
                <XMarkIcon
                  className="text-white dark:text-black"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
