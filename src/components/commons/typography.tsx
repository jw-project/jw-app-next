import { w } from 'windstitch';

export const Title = w.h1(`
  text-3xl
  text-gray-900
  dark:text-gray-100
  font-bold
  leading-tight
`);

export const Subtitle = w.div(`
  block
  uppercase
  tracking-wide
  transition-colors
  text-gray-600
  dark:text-gray-200
  text-md
  font-bold
  mb-2
`);

export const Paragraph = w.p(`
  text-base
  text-gray-600
  dark:text-gray-400
  mt-4
  block
`);
