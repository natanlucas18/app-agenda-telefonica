'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContact } from '../actions/create-contact';

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}
