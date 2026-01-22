'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateContact } from '../actions/update-contact';

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
  });
}
