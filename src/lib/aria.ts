export const getAriaSort = (
  sorted: false | 'asc' | 'desc'
): 'none' | 'ascending' | 'descending' => {
  if (sorted === 'asc') return 'ascending'
  if (sorted === 'desc') return 'descending'
  return 'none'
}
