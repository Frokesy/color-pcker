import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'

interface DropdownProps {
  selectedColor: string;
}
const Dropdown: React.FC<DropdownProps> = ({ selectedColor }) => {

  const [copied, setCopied] = useState(false);
  
  const links = [
    { label: 'Copy as raw' },
    { label: 'Copy as CSS' },
    { label: 'Copy as Tailwind' },
  ]

  const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const resetCopiedStatus = () => {
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  const handleColorFormat = (format: string) => {
    switch (format) {
      case "Copy as raw":
        navigator.clipboard.writeText(selectedColor);
        setCopied(true);
        resetCopiedStatus();
        break;
      case "Copy as CSS":
        navigator.clipboard.writeText(`color: ${selectedColor};`);
        setCopied(true);
        resetCopiedStatus();
        break;
      case "Copy as Tailwind":
        navigator.clipboard.writeText(`text-[${selectedColor}]`);
        setCopied(true);
        resetCopiedStatus();
        break;
      default:
        break;
    }
  }
  return (

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button disabled={copied} className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {copied ? 'Copied!' : 'Copy'}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            
            {links.map((link, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <span
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    onClick={() => handleColorFormat(link.label)}
                  >
                    {link.label}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown;