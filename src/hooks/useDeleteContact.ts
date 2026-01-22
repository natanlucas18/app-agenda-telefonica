'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteContact } from '../actions/delete-contact';

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });

    },
  });
}
