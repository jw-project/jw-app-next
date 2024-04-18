export type SearchParams = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type Params<T extends object = object> = {
  params: T;
};

export type PageProps<T extends object = object> = Params<T> & SearchParams;
