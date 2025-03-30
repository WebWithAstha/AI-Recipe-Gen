import React from 'react';
import Header from './partials/Header';
import { srcs, classNames, shuffleArray } from '../utils/layoutHelper';

const Layout = ({ children }) => {
  const shuffledSrcs = shuffleArray(srcs);
  return (
    <div className="relative z-[0] flex bg-gradient-to-r min-h-screen h-full from-gray-800 to-gray-900 text-white items-center justify-center flex-col">
      <div className="fixed top-0 left-0 w-screen h-screen z-[-1]">
        {shuffledSrcs.map((src, index) => (
          <img key={index} className={`${classNames[index]} opacity-60 blur-xs`} src={src} alt="" />
        ))}
      </div>
      <div className="flex max-w-[1256px] pt-16 flex-col min-h-screen">
        <main className="flex-grow p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;