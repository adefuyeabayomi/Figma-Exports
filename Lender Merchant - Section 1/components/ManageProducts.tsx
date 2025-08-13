import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { toast } from 'sonner@2.0.3';
import { 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Copy,
  Eye,
  Power,
  PowerOff,
  Download,
  Trash2,
  FileText
} from 'lucide-react';

interface ManageProductsProps {
  onCreateProduct: () => void;
}

interface LoanProduct {
  id: string;
  productName: string;
  amountRange: string;
  tenures: string[];
  interestRate: string;
  interestType: string;
  status: 'active' | 'inactive' | 'draft';
  visibleToBorrowers: boolean;
  createdOn: string;
  totalLoans: number;
  activeLoanCount: number;
  processingFee: string;
  autoApproval: boolean;
}

// Mock data for loan products
const mockProducts: LoanProduct[] = [
  {
    id: '1',
    productName: 'SME Boost Loan',
    amountRange: '₦50,000 - ₦500,000',
    tenures: ['30', '60', '90'],
    interestRate: '5%',
    interestType: 'flat',
    status: 'active',
    visibleToBorrowers: true,
    createdOn: '2024-06-15',
    totalLoans: 245,
    activeLoanCount: 89,
    processingFee: '2.5%',
    autoApproval: true
  },
  {
    id: '2',
    productName: 'Salary Advance 30',
    amountRange: '₦10,000 - ₦150,000',
    tenures: ['30'],
    interestRate: '4%',
    interestType: 'flat',
    status: 'active',
    visibleToBorrowers: true,
    createdOn: '2024-05-20',
    totalLoans: 567,
    activeLoanCount: 234,
    processingFee: '₦1,000',
    autoApproval: true
  },
  {
    id: '3',
    productName: 'Quick Cash Emergency',
    amountRange: '₦5,000 - ₦50,000',
    tenures: ['7', '14'],
    interestRate: '3%',
    interestType: 'reducing',
    status: 'active',
    visibleToBorrowers: true,
    createdOn: '2024-07-01',
    totalLoans: 123,
    activeLoanCount: 45,
    processingFee: '₦500',
    autoApproval: false
  },
  {
    id: '4',
    productName: 'Business Growth Loan',
    amountRange: '₦100,000 - ₦2,000,000',
    tenures: ['90', '180', '365'],
    interestRate: '8%',
    interestType: 'reducing',
    status: 'inactive',
    visibleToBorrowers: false,
    createdOn: '2024-04-10',
    totalLoans: 67,
    activeLoanCount: 12,
    processingFee: '3%',
    autoApproval: false
  },
  {
    id: '5',
    productName: 'Student Loan Pilot',
    amountRange: '₦20,000 - ₦200,000',
    tenures: ['60', '90'],
    interestRate: '2%',
    interestType: 'flat',
    status: 'draft',
    visibleToBorrowers: false,
    createdOn: '2024-07-20',
    totalLoans: 0,
    activeLoanCount: 0,
    processingFee: '1%',
    autoApproval: false
  }
];

export function ManageProducts({ onCreateProduct }: ManageProductsProps) {
  const [products, setProducts] = useState<LoanProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('createdOn');

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.productName.localeCompare(b.productName);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'createdOn':
          return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
        default:
          return 0;
      }
    });

  const handleStatusChange = (productId: string, newStatus: 'active' | 'inactive') => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, status: newStatus }
        : product
    ));
    toast.success(`Product ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`);
  };

  const handleDuplicate = (product: LoanProduct) => {
    const duplicatedProduct: LoanProduct = {
      ...product,
      id: Date.now().toString(),
      productName: `${product.productName} (Copy)`,
      status: 'draft',
      createdOn: new Date().toISOString().split('T')[0],
      totalLoans: 0,
      activeLoanCount: 0
    };
    
    setProducts(prev => [duplicatedProduct, ...prev]);
    toast.success('Product duplicated successfully');
  };

  const handleDelete = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
    toast.success('Product deleted successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan Products</h1>
          <p className="text-sm text-gray-600">Manage your loan products and their configurations</p>
        </div>
        <Button onClick={onCreateProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {products.filter(p => p.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Products</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {products.reduce((sum, p) => sum + p.totalLoans, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Loans Issued</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {products.reduce((sum, p) => sum + p.activeLoanCount, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Active Loans</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdOn">Created Date</SelectItem>
                  <SelectItem value="name">Product Name</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Amount Range</TableHead>
                <TableHead>Tenure(s)</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visible to Borrowers</TableHead>
                <TableHead>Total Loans</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.productName}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span>Fee: {product.processingFee}</span>
                        {product.autoApproval && (
                          <Badge variant="outline" className="text-xs">Auto-approval</Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.amountRange}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {product.tenures.map((tenure) => (
                        <Badge key={tenure} variant="outline" className="text-xs">
                          {tenure}d
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{product.interestRate}</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.interestType}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    {product.visibleToBorrowers ? (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Yes</Badge>
                    ) : (
                      <Badge variant="outline">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{product.totalLoans}</div>
                      <div className="text-sm text-gray-600">
                        {product.activeLoanCount} active
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(product.createdOn)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(product)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {product.status === 'active' ? (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(product.id, 'inactive')}
                            className="text-orange-600"
                          >
                            <PowerOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(product.id, 'active')}
                            className="text-green-600"
                          >
                            <Power className="h-4 w-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              className="text-red-600"
                              onSelect={(e) => e.preventDefault()}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Product
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Product</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{product.productName}"? This action cannot be undone.
                                {product.activeLoanCount > 0 && (
                                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                                    Warning: This product has {product.activeLoanCount} active loans.
                                  </div>
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete Product
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by creating your first loan product.'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={onCreateProduct} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Product
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}