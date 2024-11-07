
import './App.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <div>
        <Timeline />
      </div>
    </>
  )
}

interface Props {
  date?: string;
  title: string;
  description?: string;
  icon?: JSX.Element;
  route: string
}

const TimelineItem = ({ date, title, description, icon, route }: Props) => {
  return (
    <div className="flex gap-x-3 relative group rounded-lg hover:bg-pink-100">
      <a className="z-[1] absolute inset-0" href={route}></a>
      {/* Icon */}
      <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className="size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600"></div>
        </div>
      </div>
      {/* End Icon */}

      {/* Right Content */}
      <div className="grow p-2 pb-8">
        <h2 className="flex justify-start">{date}</h2>
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 text:black items-center">
          {icon}
          {title}
        </h3>
        {description && <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">{description}</p>}

      </div>
      {/* End Right Content */}
    </div>
  );
};

const Timeline = () => {
  return (
    <div>
      <TimelineItem
        route="/koey-invite/birthday"
        date="23 September 2024"
        title="Koey's 21st Birthday Invite"
        description="The most awesome birthday inviation in the world, made by JAYDEN's Services PTE LTD."
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-cake"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 20h18v-8a3 3 0 0 0 -3 -3h-12a3 3 0 0 0 -3 3v8z" /><path d="M3 14.803c.312 .135 .654 .204 1 .197a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1c.35 .007 .692 -.062 1 -.197" /><path d="M12 4l1.465 1.638a2 2 0 1 1 -3.015 .099l1.55 -1.737z" /></svg>
        }
      />
      <TimelineItem
        route="/koey-invite/gf"
        date="8 November 2024"
        title="CLICK ME!!"
        description="EHEHEHEHE."
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>
        }
      />
    </div>
  );
};

export default App
