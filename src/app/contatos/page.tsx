"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, PencilLine, SearchIcon, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Contact } from "@/src/types/contacts-schema"
import CreateContactForm from "@/src/components/contacts-form"
import { useContacts } from "@/src/hooks/useContacts"
import { ContactDeleteAlert } from "@/src/components/contact-delete-alert"
import { formatPhone } from "@/src/lib/format-phone"
import EditContactForm from "@/src/components/contact-edit-form"

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black"
        >
          Nome
          <ArrowUpDown className="text-purple-700" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize text-gray-500">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black"
        >
          Email
          <ArrowUpDown className="text-purple-700"/>
        </Button>
      )
    }, cell: ({ row }) => {
      return <div className="font-medium text-gray-500">{row.getValue("email")}</div>
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-black"
        >
          Telefone
          <ArrowUpDown className="text-purple-700" />
        </Button>
      )
    },
    cell: ({ getValue }) => {
      const phone = getValue<string>();
      return ( <div className=" text-gray-500">{formatPhone(phone)}</div>
    )
    }, 
  },
  {
    id: "actions",
    header: () => {
      return <div className="text-black">Ações</div>
    },
    enableHiding: true,
    cell: ({ row }) => {
      const contacts = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only text-white cursor-pointer">Abrir menu</span>
              <MoreHorizontal className="text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border border-gray-200">
            <DropdownMenuLabel className="text-gray-600">Ações</DropdownMenuLabel>
            <EditContactForm defaultValues={contacts}/>
            <DropdownMenuSeparator />
            <ContactDeleteAlert contactId={contacts.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function ContactsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [search, setSearch] = React.useState('');

  const sortBy = sorting[0]?.id ?? 'name'
  const sortOrder = sorting[0]?.desc ? 'desc' : 'asc'

  const handleLimitChange = (value: string) => {
    setLimit(Number(value)),
      setPage(1)
  };

  const { data } = useContacts({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  })


  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualSorting: true,
    manualPagination: true,
    state: {
      sorting,
      columnVisibility,
    },
  })

  return (
    <main className="flex flex-col w-full min-h-[91dvh] px-2 py-10 md:px-6 md:py-10 lg:px-10 lg:py-10 font-sans bg-neutral-100">
      <div className="flex flex-col min-h-[80%] bg-white/95 px-4 py-4 rounded-md">
        <div className="flex flex-col md:flex-row lg:flex-row w-full py-4 gap-2">
          <div className="relative">
            <SearchIcon className='absolute inset-y-0 left-0 flex place-self-center pointer-events-none pl-2' />
            <Input
              className="border pl-7 rounded-md text-gray-500 w-65 md:w-72 lg:w-78"
              placeholder="Buscar por nome…"
              value={search}
              onChange={(e) => {
                setPage(1)
                setSearch(e.target.value)
              }}
            />
          </div>
          <CreateContactForm />
        </div>
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="bg-neutral-100">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    Nenhum resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex flex-col md:flex-row lg:flex-row mt-2 md:mt-4 lg:mt-4 md:items-center lg:items-center justify-between'>
          <div className='flex items-center justify-start'>
            <Select value={limit.toString()} onValueChange={handleLimitChange}>
              <SelectTrigger className='w-18 text-gray-700  mb-2'>
                <SelectValue className="text-black" placeholder={limit.toString()}
                />
              </SelectTrigger>
              <SelectContent className="w-40 bg-white/95 px-2 py-2 mr-4 rounded-xl border border-neutral-200" side="bottom">
                <SelectGroup className='rounded-lg'>
                  <SelectItem value='5' className='cursor-pointer text-black hover:bg-gray-300'>5</SelectItem>
                  <SelectItem value='10' className='cursor-pointer text-black hover:bg-gray-300'>10</SelectItem>
                  <SelectItem value='15' className='cursor-pointer text-black hover:bg-gray-300'>15</SelectItem>
                  <SelectItem value='20' className='cursor-pointer text-black hover:bg-gray-300'>20</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center self-center md:justify-end lg:justify-end gap-4">
            <Button
              className="border text-white hover:bg-black/75 px-3 py-1 rounded-md cursor-pointer"
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Anterior
            </Button>

            <span className='text-black'>
              Página {page} de {data?.meta?.totalPages}
            </span>

            <Button
              className="border text-white hover:bg-black/75 px-3 py-1 rounded-md cursor-pointer"
              disabled={page === data?.meta?.totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
