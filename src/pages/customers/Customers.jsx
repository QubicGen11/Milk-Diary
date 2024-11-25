import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  MagnifyingGlassIcon as SearchIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import CustomerModal from './CustomerModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import CustomerDetails from './CustomerDetails';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    // Load customers from localStorage
    const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
    if (storedCustomers.length === 0) {
      // Initialize with mock data
      const mockCustomers = generateMockCustomers();
      localStorage.setItem('customers', JSON.stringify(mockCustomers));
      setCustomers(mockCustomers);
    } else {
      setCustomers(storedCustomers);
    }
  }, []);

  const generateMockCustomers = () => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      phone: `+91 98765${43210 + i}`,
      address: `Address ${i + 1}, City`,
      joinDate: format(new Date(2024, 0, i + 1), 'yyyy-MM-dd'),
      totalPurchases: Math.floor(Math.random() * 50000),
      lastPurchase: format(new Date(2024, 2, i + 1), 'yyyy-MM-dd'),
    }));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Total Purchases',
        accessor: 'totalPurchases',
        Cell: ({ value }) => `₹${value.toLocaleString()}`,
      },
      {
        Header: 'Last Purchase',
        accessor: 'lastPurchase',
      },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedCustomer(row.original);
                setIsDetailsOpen(true);
              }}
              className="text-blue-600 hover:text-blue-900"
            >
              View
            </button>
            <button
              onClick={() => {
                setSelectedCustomer(row.original);
                setIsModalOpen(true);
              }}
              className="text-green-600 hover:text-green-900"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                setSelectedCustomer(row.original);
                setIsDeleteModalOpen(true);
              }}
              className="text-red-600 hover:text-red-900"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data: customers,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleSaveCustomer = (customerData) => {
    let updatedCustomers;
    if (selectedCustomer) {
      updatedCustomers = customers.map(customer =>
        customer.id === selectedCustomer.id ? { ...customerData, id: customer.id } : customer
      );
    } else {
      updatedCustomers = [...customers, { ...customerData, id: Date.now() }];
    }
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = () => {
    const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    setIsDeleteModalOpen(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Customer Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 pl-10 border rounded-md"
            onChange={e => setGlobalFilter(e.target.value)}
          />
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.render('Header')}</span>
                      {column.isSorted && (
                        column.isSortedDesc ? 
                          <ChevronDownIcon className="h-4 w-4" /> : 
                          <ChevronUpIcon className="h-4 w-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className={`px-3 py-1 border rounded-md mr-2 ${
              !canPreviousPage ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className={`px-3 py-1 border rounded-md ${
              !canNextPage ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
        customer={selectedCustomer}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDeleteCustomer}
        title="Delete Customer"
        message="Are you sure you want to delete this customer? This action cannot be undone."
      />

      <CustomerDetails
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default Customers; 