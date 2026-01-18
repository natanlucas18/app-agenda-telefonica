export type PaginationOptions = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type error = {
    timestamp: string;
    status: number;
    message: string;
    path: string;
};

export type ResponseServerDto<T> = {
    success: boolean;
    data: T;
};

export type PaginatedResponseServerDto<T> = {
    success: boolean;
    data: T[];
    meta: PaginationOptions;
};
