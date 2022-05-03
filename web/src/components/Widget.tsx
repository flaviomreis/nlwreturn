import { Chat, ChatTeardropDots } from 'phosphor-react';
import { useState } from 'react';

export function Widget() {
  const [isWidgetOpened, setWidgetOpened] = useState(false);

  function toogleWidgetStatus() {
    setWidgetOpened(!isWidgetOpened);
  }

  return (
    <div className="absolute bottom-5 right-5">
      {isWidgetOpened && <p>Hello, world</p>}
      <button
        onClick={toogleWidgetStatus}
        className="bg-brand-500 rounded-full h-12 px-3 text-white flex items-center group"
      >
        <ChatTeardropDots className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          Feedback
        </span>
      </button>
    </div>
  );
}
