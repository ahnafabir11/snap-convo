import clsx from 'clsx'

interface SidebarProps {
  isConversationSelected: Boolean
}

export default function Sidebar({ isConversationSelected }: SidebarProps) {
  return (
    <div
      className={clsx(
        'shrink-0 w-full lg:w-96 flex flex-col space-y-2 p-2 md:p-4 lg:border-r overflow-hidden',
        { 'hidden lg:flex': isConversationSelected }
      )}
    >
      <div className="grid grid-cols-3 items-center lg:grid-cols-1">
        <h3 className="justify-self-start lg:hidden text-sm md:text-xl font-semibold uppercase">
          Snap Convo
        </h3>
        <h4 className="justify-self-center lg:justify-self-start text-sm md:text-lg font-bold">
          Chats
        </h4>
        <div className="justify-self-end lg:hidden bg-gray-500 w-8 h-8 rounded-full"></div>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search user..."
          className="border text-sm md:text-base w-full rounded p-1 md:p-2"
        />
      </div>

      <section className="flex-grow space-y-2 overflow-y-auto">
        {Array.from({ length: 20 }).map((_, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="bg-gray-500 w-10 h-10 rounded-full shrink-0"></div>
            <div className="flex-grow overflow-hidden">
              <h3 className="font-medium truncate">Ahnaf Abir</h3>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500 truncate">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Sint, consectetur.
                </p>
                <p className="shrink-0 text-xs text-gray-500">7:53 pm</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
