import { w } from 'windstitch';

export const Overlay = w.div(`
    fixed
    top-0
    left-0
    right-0
    bottom-0
    w-full
    h-screen
    z-50
    overflow-hidden
    bg-gray-600
    flex
    flex-col
    items-center
    justify-center
`);

export const LoadingTitle = w.h2(`
    text-center
    text-white
    text-xl
    font-semibold
    mb-1
`);

export const LoadingSubtitle = w.p(`
    md:w-1/3
    w-4/6
    text-center
    text-white
`);
