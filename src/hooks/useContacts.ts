'use client';
import {  useQuery } from '@tanstack/react-query'
import { Params } from '../types/params';
import { getContacts } from '../actions/get-contacts';
import { cookies } from 'next/headers';


export function useContacts({page, limit, search, sortBy, sortOrder}: Params){
  return useQuery({
    queryKey: ['contacts', {page, limit, search, sortBy, sortOrder}],
    queryFn: () => getContacts({page, limit, search, sortBy, sortOrder}),
    keepPreviousData: true,
  })
};

