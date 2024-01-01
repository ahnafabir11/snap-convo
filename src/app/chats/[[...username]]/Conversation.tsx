import {
  ChevronLeftIcon,
  EllipsisVerticalIcon,
  DocumentPlusIcon,
  PhotoIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'

interface ConversationProps {
  isConversationSelected: Boolean
}

export default function Conversation({
  isConversationSelected,
}: ConversationProps) {
  return (
    <div
      className={clsx('flex-grow flex flex-col overflow-hidden', {
        hidden: !isConversationSelected,
      })}
    >
      {/* SELECTED USER INFO */}
      <div className="shrink-0 flex items-center p-2 border-b overflow-hidden">
        <Link href="/chats" className="shrink-0 mr-2 lg:hidden">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <div className="shrink-0 bg-gray-500 w-10 h-10 rounded-full mr-2"></div>
        <div className="mr-auto overflow-hidden">
          <h3 className="font-medium truncate">Md Ahnaf Abir</h3>
          <p className="text-xs truncate">@ahnafabir11</p>
        </div>
        <div className="shrink-0">
          <EllipsisVerticalIcon className="w-6 h-6" />
        </div>
      </div>

      {/* CHATS BUBBLES */}
      <div className="flex-grow overflow-y-auto space-y-2 p-4">
        <div className="bg-blue-400 text-white w-4/5 lg:max-w-xl rounded-lg p-2">
          <span className="text-sm md:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            voluptate nemo voluptatum magni voluptatem. Similique ipsa qui
            aspernatur iure laudantium!
          </span>
        </div>

        <div className="bg-gray-300 text-black w-4/5 lg:max-w-xl rounded-lg p-2 ml-auto">
          <span className="text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, magni
            omnis fugit explicabo vitae neque voluptate enim minima blanditiis
            atque.
          </span>
        </div>
      </div>

      {/* SEND MESSAGE INPUTS */}
      <div className="shrink-0 flex items-center gap-1 p-2">
        <div>
          <DocumentPlusIcon className="w-6 h-6" />
        </div>
        <div>
          <PhotoIcon className="w-6 h-6" />
        </div>
        <div className="grow">
          <textarea
            rows={1}
            placeholder="Aa"
            className="w-full text-sm md:text-base border rounded-3xl px-2 py-2"
          />
        </div>
        <div>
          <PaperAirplaneIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
