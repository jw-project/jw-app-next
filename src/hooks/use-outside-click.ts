import { useEffect, type RefObject } from 'react';

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`);
  }
}

export function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  deps: Array<any>,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      assertIsNode(event.target);
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, ...deps]);
}
