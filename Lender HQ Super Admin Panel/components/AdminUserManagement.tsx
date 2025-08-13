import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MoreHorizontal, UserPlus, Shield, User } from 'lucide-react';

const admins = [
  {
    id: 1,
    name: 'John Adebayo',
    email: 'john@lenderhq.com',
    role: 'Super Admin',
    status: 'active',
    lastLogin: '2024-01-20 14:30:25',
  },
  {
    id: 2,
    name: 'Sarah Okafor',
    email: 'sarah@lenderhq.com',
    role: 'KYC Reviewer',
    status: 'active',
    lastLogin: '2024-01-20 12:15:10',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@lenderhq.com',
    role: 'Support Manager',
    status: 'inactive',
    lastLogin: '2024-01-19 16:45:30',
  },
];

export function AdminUserManagement() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Admin User Management</h1>
          <p className="text-muted-foreground">Manage administrator accounts and permissions</p>
        </div>
        <Button>
          <UserPlus size={16} className="mr-2" />
          Add Admin User
        </Button>
      </div>

      <div className="space-y-4">
        {admins.map((admin) => (
          <Card key={admin.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>
                    {admin.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{admin.name}</h3>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Last login: {admin.lastLogin}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-muted-foreground" />
                  <span className="text-sm">{admin.role}</span>
                </div>
                <Badge 
                  variant={admin.status === 'active' ? 'default' : 'secondary'}
                  className={admin.status === 'active' ? 'bg-green-100 text-green-700' : ''}
                >
                  {admin.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}