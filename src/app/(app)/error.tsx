'use client';

import { useEffect } from 'react';

import type { HttpError } from '~/actions/http-responses';
import { BaseErrorScreen } from '~/components/error-screen';

function getJson(item: HttpError & { digest?: string }) {
  let value =
    typeof item.message !== 'string'
      ? JSON.stringify(item.message)
      : item.message;
  try {
    value = JSON.parse(value.replace('Error: ', ''));
  } catch (e) {
    return item;
  }

  return typeof value === 'object' && value !== null ? value : item;
}

export default function Error({
  error,
}: {
  error: HttpError & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const errorJson = getJson(error);
  const { message, status } = errorJson;

  return <BaseErrorScreen message={message} status={status} />;
}
