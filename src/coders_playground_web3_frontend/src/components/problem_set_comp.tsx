"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  Row,
  Column,
  Table as TanstackTable,
  Cell,
  Header,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
  CircleX,
  Code,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/explore-button";
import { Checkbox } from "../ui/checkbox-footer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/explore-input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/explore-lable";

// Types
type Problem = {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  status: "Solved" | "Attempted" | "Not Started";
  acceptance: number;
  frequency: number;
  tags: string[];
  premium: boolean;
};

// Sample data
const problems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    status: "Solved",
    acceptance: 49.2,
    frequency: 85,
    tags: ["Array", "Hash Table"],
    premium: false,
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    status: "Attempted",
    acceptance: 37.8,
    frequency: 72,
    tags: ["Linked List", "Math", "Recursion"],
    premium: false,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "Solved",
    acceptance: 33.8,
    frequency: 91,
    tags: ["Hash Table", "String", "Sliding Window"],
    premium: false,
  },
    {
    id: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Very Hard",
    status: "Not Started",
    acceptance: 35.3,
    frequency: 68,
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    premium: false,
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    status: "Attempted",
    acceptance: 32.1,
    frequency: 79,
    tags: ["String", "Dynamic Programming"],
    premium: true,
  },
  {
    id: "6",
    title: "ZigZag Conversion",
    difficulty: "Medium",
    status: "Not Started",
    acceptance: 42.7,
    frequency: 45,
    tags: ["String"],
    premium: false,
  },
  {
    id: "7",
    title: "Reverse Integer",
    difficulty: "Medium",
    status: "Solved",
    acceptance: 26.8,
    frequency: 62,
    tags: ["Math"],
    premium: false,
  },
  {
    id: "8",
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    status: "Not Started",
    acceptance: 16.4,
    frequency: 58,
    tags: ["String"],
    premium: false,
  },
];

// Filter functions
const multiColumnFilterFn: FilterFn<Problem> = (row: Row<Problem>, columnId: string, filterValue: any) => {
  const searchableRowContent = `${row.original.title} ${row.original.tags.join(" ")}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const difficultyFilterFn: FilterFn<Problem> = (row: Row<Problem>, columnId: string, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const difficulty = row.getValue(columnId) as string;
  return filterValue.includes(difficulty);
};

const statusFilterFn: FilterFn<Problem> = (row: Row<Problem>, columnId: string, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

const tagsFilterFn: FilterFn<Problem> = (row: Row<Problem>, columnId: string, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const tags = row.getValue(columnId) as string[];
  return filterValue.some(tag => tags.includes(tag));
};

// Status icon component
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Solved":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Attempted":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <XCircle className="h-4 w-4 text-gray-400" />;
  }
};

// Difficulty badge component
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const colors = {
    Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm",
    Medium: "bg-amber-50 text-amber-700 border-amber-200 shadow-sm",
    Hard: "bg-orange-50 text-orange-700 border-orange-200 shadow-sm",
    "Very Hard": "bg-red-50 text-red-700 border-red-200 shadow-sm",
  };
  
  return (
    <Badge className={cn("border font-medium px-2.5 py-1 rounded-full", colors[difficulty as keyof typeof colors])}>
      {difficulty}
    </Badge>
  );
};

// Column definitions
const columns: ColumnDef<Problem>[] = [
  {
    id: "select",
    header: ({ table }: { table: TanstackTable<Problem> }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: { row: Row<Problem> }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "status",
    header: "",
    accessorKey: "status",
    cell: ({ row }: { row: Row<Problem> }) => <StatusIcon status={row.getValue("status")} />,
    size: 40,
    filterFn: statusFilterFn,
  },
  {
    accessorKey: "title",
    header: ({ column }: { column: Column<Problem> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-medium"
      >
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Problem> }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.getValue("title")}</span>
        {row.original.premium && (
          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
            Premium
          </Badge>
        )}
      </div>
    ),
    filterFn: multiColumnFilterFn,
    size: 300,
  },
  {
    accessorKey: "difficulty",
    header: ({ column }: { column: Column<Problem> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-medium"
      >
        Difficulty
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Problem> }) => <DifficultyBadge difficulty={row.getValue("difficulty")} />,
    filterFn: difficultyFilterFn,
    size: 120,
  },
  {
    accessorKey: "acceptance",
    header: ({ column }: { column: Column<Problem> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-medium"
      >
        Acceptance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Problem> }) => {
      const acceptance = row.getValue("acceptance") as number;
      return <span className="text-muted-foreground">{acceptance}%</span>;
    },
    size: 100,
  },
  {
    accessorKey: "frequency",
    header: ({ column }: { column: Column<Problem> }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-medium"
      >
        Frequency
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: { row: Row<Problem> }) => {
      const frequency = row.getValue("frequency") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-12 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${frequency}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{frequency}%</span>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }: { row: Row<Problem> }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{tags.length - 2}
            </Badge>
          )}
        </div>
      );
    },
    filterFn: tagsFilterFn,
    size: 200,
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Problem> }) => {
      const problem = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Code className="mr-2 h-4 w-4" />
              Solve Problem
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trophy className="mr-2 h-4 w-4" />
              View Solutions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add to List</DropdownMenuItem>
            <DropdownMenuItem>Mark as Favorite</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 60,
  },
];

function CodingProblemsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: problems,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Get unique values for filters
  const uniqueDifficulties = React.useMemo(() => {
    return Array.from(new Set(problems.map(p => p.difficulty)));
  }, []);

  const uniqueStatuses = React.useMemo(() => {
    return Array.from(new Set(problems.map(p => p.status)));
  }, []);

  const uniqueTags = React.useMemo(() => {
    return Array.from(new Set(problems.flatMap(p => p.tags))).sort();
  }, []);

  // Filter states
  const selectedDifficulties = React.useMemo(() => {
    const filterValue = table.getColumn("difficulty")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("difficulty")?.getFilterValue()]);

  const selectedStatuses = React.useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("status")?.getFilterValue()]);

  const selectedTags = React.useMemo(() => {
    const filterValue = table.getColumn("tags")?.getFilterValue() as string[];
    return filterValue ?? [];
  }, [table.getColumn("tags")?.getFilterValue()]);

  const handleDifficultyChange = (checked: boolean, value: string) => {
    const newFilterValue = checked
      ? [...selectedDifficulties, value]
      : selectedDifficulties.filter(d => d !== value);
    table.getColumn("difficulty")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  const handleStatusChange = (checked: boolean, value: string) => {
    const newFilterValue = checked
      ? [...selectedStatuses, value]
      : selectedStatuses.filter(s => s !== value);
    table.getColumn("status")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  const handleTagsChange = (checked: boolean, value: string) => {
    const newFilterValue = checked
      ? [...selectedTags, value]
      : selectedTags.filter(t => t !== value);
    table.getColumn("tags")?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
  };

  return (
        <div className="w-full space-y-6 p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Problems</h1>
          <p className="text-slate-600 mt-1">
            Solve coding problems to improve your skills
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl px-6">
          <Plus className="mr-2 h-4 w-4" />
          Create Problem
        </Button>
      </div>

            {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
                {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search problems..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="pl-9 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {!!table.getColumn("title")?.getFilterValue() && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => table.getColumn("title")?.setFilterValue("")}
            >
              <CircleX className="h-4 w-4" />
            </button>
          )}
        </div>

                {/* Difficulty Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed rounded-xl border-slate-200 hover:bg-slate-50 transition-colors">
              <Filter className="mr-2 h-4 w-4" />
              Difficulty
              {selectedDifficulties.length > 0 && (
                <Badge className="ml-2 h-5 px-1.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {selectedDifficulties.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="start">
            <div className="space-y-3">
              <h4 className="font-medium">Difficulty</h4>
              <div className="space-y-2">
                {uniqueDifficulties.map((difficulty) => (
                  <div key={difficulty} className="flex items-center space-x-2">
                    <Checkbox
                      id={`difficulty-${difficulty}`}
                      checked={selectedDifficulties.includes(difficulty)}
                      onCheckedChange={(checked: boolean) => handleDifficultyChange(!!checked, difficulty)}
                    />
                    <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                      {difficulty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

                {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed rounded-xl border-slate-200 hover:bg-slate-50 transition-colors">
              <Clock className="mr-2 h-4 w-4" />
              Status
              {selectedStatuses.length > 0 && (
                <Badge className="ml-2 h-5 px-1.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {selectedStatuses.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="start">
            <div className="space-y-3">
              <h4 className="font-medium">Status</h4>
              <div className="space-y-2">
                {uniqueStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={(checked: boolean) => handleStatusChange(!!checked, status)}
                    />
                    <Label htmlFor={`status-${status}`} className="text-sm flex items-center gap-2">
                      <StatusIcon status={status} />
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

                {/* Tags Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-dashed rounded-xl border-slate-200 hover:bg-slate-50 transition-colors">
              <Code className="mr-2 h-4 w-4" />
              Tags
              {selectedTags.length > 0 && (
                <Badge className="ml-2 h-5 px-1.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="start">
            <div className="space-y-3">
              <h4 className="font-medium">Tags</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {uniqueTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked: boolean) => handleTagsChange(!!checked, tag)}
                    />
                    <Label htmlFor={`tag-${tag}`} className="text-sm">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

                {/* Column Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-xl border-slate-200 hover:bg-slate-50 transition-colors">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: Column<Problem>) => column.getCanHide())
              .map((column: Column<Problem>) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

            {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<Problem, unknown>) => {
                  return (
                    <TableHead key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<Problem>) => (
                                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-slate-50/80 transition-colors border-slate-100"
                >
                  {row.getVisibleCells().map((cell: Cell<Problem, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

            {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-200">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value: string) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
                        <Button
              variant="outline"
              className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-slate-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              {"<<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-slate-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              {"<"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-slate-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              {">"}
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0 rounded-lg border-slate-200 hover:bg-slate-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              {">>"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodingProblemsTable;
