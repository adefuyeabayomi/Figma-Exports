import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Pause, 
  Play,
  UserCheck
} from 'lucide-react';

const merchants = [
  {
    id: 1,
    name: 'TechCorp Nigeria Ltd',
    logo: '🏢',
    status: 'active',
    kycStatus: 'approved',
    createdDate: '2024-01-15',
    rcNumber: 'RC123456',
  },
  {
    id: 2,
    name: 'Lagos Business Hub',
    logo: '🏭',
    status: 'pending',
    kycStatus: 'pending',
    createdDate: '2024-01-20',
    rcNumber: 'RC789012',
  },
  {
    id: 3,
    name: 'Abuja Trading Co.',
    logo: '🏪',
    status: 'active',
    kycStatus: 'approved',
    createdDate: '2024-01-10',
    rcNumber: 'RC345678',
  },
  {
    id: 4,
    name: 'Delta Manufacturing',
    logo: '🏭',
    status: 'suspended',
    kycStatus: 'rejected',
    createdDate: '2024-01-05',
    rcNumber: 'RC901234',
  },
];

export function MerchantManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMerchant, setSelectedMerchant] = useState<typeof merchants[0] | null>(null);

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         merchant.rcNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getKYCBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (selectedMerchant) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => setSelectedMerchant(null)}>
            ← Back to Merchants
          </Button>
          <div>
            <h1>Merchant Profile</h1>
            <p className="text-muted-foreground">{selectedMerchant.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Business Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Business Name</label>
                    <p>{selectedMerchant.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">RC Number</label>
                    <p>{selectedMerchant.rcNumber}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedMerchant.status)}</div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">KYC Status</label>
                    <div className="mt-1">{getKYCBadge(selectedMerchant.kycStatus)}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Contact & Banking</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p>contact@techcorp.ng</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p>+234 801 234 5678</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Address</label>
                  <p>123 Lagos Street, Victoria Island, Lagos State</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle size={16} className="mr-2" />
                  Approve KYC
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck size={16} className="mr-2" />
                  Impersonate
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Pause size={16} className="mr-2" />
                  Suspend Account
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last login</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loans processed</span>
                  <span>847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total volume</span>
                  <span>₦12.4M</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Merchant Management</h1>
          <p className="text-muted-foreground">Manage all merchants on your platform</p>
        </div>
        <Button>Add New Merchant</Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or RC number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Merchants List */}
      <div className="space-y-4">
        {filteredMerchants.map((merchant) => (
          <Card key={merchant.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-xl">
                  {merchant.logo}
                </div>
                <div>
                  <h3 className="font-medium">{merchant.name}</h3>
                  <p className="text-sm text-muted-foreground">RC: {merchant.rcNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Created: {new Date(merchant.createdDate).toLocaleDateString()}
                </div>
                {getStatusBadge(merchant.status)}
                {getKYCBadge(merchant.kycStatus)}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedMerchant(merchant)}>
                      <Eye size={16} className="mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle size={16} className="mr-2" />
                      Approve KYC
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserCheck size={16} className="mr-2" />
                      Impersonate
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pause size={16} className="mr-2" />
                      Suspend
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}