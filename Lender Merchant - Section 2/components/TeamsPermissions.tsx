import { useState } from "react";
import { Plus, Edit, Trash2, UserMinus, Mail, Shield, Users, Key } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended' | 'pending';
  lastLogin: string;
  joinedDate: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: {
    [module: string]: {
      view: boolean;
      create: boolean;
      edit: boolean;
      delete: boolean;
      export: boolean;
    };
  };
  memberCount: number;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "USER001",
    name: "Erik Lamela",
    email: "erik@lender.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "2024-01-30 15:45",
    joinedDate: "2024-01-01"
  },
  {
    id: "USER002",
    name: "Sarah Wilson",
    email: "sarah@lender.com",
    role: "Loan Officer",
    status: "active",
    lastLogin: "2024-01-30 14:30",
    joinedDate: "2024-01-05"
  },
  {
    id: "USER003",
    name: "David Brown",
    email: "david@lender.com",
    role: "Finance Manager",
    status: "active",
    lastLogin: "2024-01-30 10:15",
    joinedDate: "2024-01-03"
  },
  {
    id: "USER004",
    name: "Alice Johnson",
    email: "alice@lender.com",
    role: "Compliance Officer",
    status: "active",
    lastLogin: "2024-01-29 16:20",
    joinedDate: "2024-01-10"
  },
  {
    id: "USER005",
    name: "Mike Roberts",
    email: "mike@lender.com",
    role: "Support Agent",
    status: "suspended",
    lastLogin: "2024-01-25 09:30",
    joinedDate: "2024-01-15"
  }
];

const mockRoles: Role[] = [
  {
    id: "ROLE001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    permissions: {
      dashboard: { view: true, create: true, edit: true, delete: true, export: true },
      customers: { view: true, create: true, edit: true, delete: true, export: true },
      loans: { view: true, create: true, edit: true, delete: true, export: true },
      payments: { view: true, create: true, edit: true, delete: true, export: true },
      reports: { view: true, create: true, edit: true, delete: true, export: true },
      settings: { view: true, create: true, edit: true, delete: true, export: true }
    },
    memberCount: 1
  },
  {
    id: "ROLE002",
    name: "Loan Officer",
    description: "Manage loan applications and customer interactions",
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false, export: false },
      customers: { view: true, create: true, edit: true, delete: false, export: true },
      loans: { view: true, create: true, edit: true, delete: false, export: true },
      payments: { view: true, create: true, edit: false, delete: false, export: false },
      reports: { view: true, create: false, edit: false, delete: false, export: true },
      settings: { view: false, create: false, edit: false, delete: false, export: false }
    },
    memberCount: 1
  },
  {
    id: "ROLE003",
    name: "Finance Manager",
    description: "Oversee financial operations and reporting",
    permissions: {
      dashboard: { view: true, create: false, edit: false, delete: false, export: true },
      customers: { view: true, create: false, edit: false, delete: false, export: true },
      loans: { view: true, create: false, edit: true, delete: false, export: true },
      payments: { view: true, create: true, edit: true, delete: true, export: true },
      reports: { view: true, create: true, edit: true, delete: false, export: true },
      settings: { view: true, create: false, edit: true, delete: false, export: false }
    },
    memberCount: 1
  }
];

const modules = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'customers', name: 'Customers' },
  { id: 'loans', name: 'Loans' },
  { id: 'payments', name: 'Payments' },
  { id: 'reports', name: 'Reports' },
  { id: 'settings', name: 'Settings' }
];

const permissions = ['view', 'create', 'edit', 'delete', 'export'];

export function TeamsPermissions() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers);
  const [roles, setRoles] = useState(mockRoles);
  const [inviteModal, setInviteModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newInvite, setNewInvite] = useState({
    email: "",
    role: ""
  });
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {} as any
  });

  const handleInviteMember = () => {
    if (!newInvite.email || !newInvite.role) {
      alert("Please fill all required fields");
      return;
    }

    const member: TeamMember = {
      id: `USER${String(teamMembers.length + 1).padStart(3, '0')}`,
      name: newInvite.email.split('@')[0],
      email: newInvite.email,
      role: newInvite.role,
      status: 'pending',
      lastLogin: 'Never',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setTeamMembers(prev => [...prev, member]);
    setNewInvite({ email: "", role: "" });
    setInviteModal(false);
    alert("Invitation sent successfully!");
  };

  const handleSuspendMember = (memberId: string) => {
    if (confirm("Are you sure you want to suspend this team member?")) {
      setTeamMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, status: member.status === 'suspended' ? 'active' : 'suspended' as const }
          : member
      ));
    }
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm("Are you sure you want to remove this team member?")) {
      setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    }
  };

  const handleCreateRole = () => {
    if (!newRole.name || !newRole.description) {
      alert("Please fill all required fields");
      return;
    }

    const role: Role = {
      id: `ROLE${String(roles.length + 1).padStart(3, '0')}`,
      name: newRole.name,
      description: newRole.description,
      permissions: newRole.permissions,
      memberCount: 0
    };

    setRoles(prev => [...prev, role]);
    setNewRole({ name: "", description: "", permissions: {} });
    setRoleModal(false);
    alert("Role created successfully!");
  };

  const handlePermissionChange = (module: string, permission: string, checked: boolean) => {
    setNewRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permission]: checked
        }
      }
    }));
  };

  const initializeNewRole = () => {
    const defaultPermissions: any = {};
    modules.forEach(module => {
      defaultPermissions[module.id] = {
        view: false,
        create: false,
        edit: false,
        delete: false,
        export: false
      };
    });
    setNewRole({ name: "", description: "", permissions: defaultPermissions });
    setEditingRole(null);
    setRoleModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Teams & Permissions</h1>
        <div className="flex items-center gap-4">
          <Button onClick={() => setInviteModal(true)} variant="outline" className="gap-2">
            <Mail className="h-4 w-4" />
            Invite Member
          </Button>
          <Button onClick={initializeNewRole} className="gap-2">
            <Shield className="h-4 w-4" />
            Create Role
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{teamMembers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {teamMembers.filter(m => m.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">
              {teamMembers.filter(m => m.status === 'pending').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Key className="h-4 w-4" />
              Custom Roles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{roles.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(member.status)}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.lastLogin}</TableCell>
                  <TableCell>{member.joinedDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert(`Editing ${member.name}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSuspendMember(member.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Roles & Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {roles.map((role) => (
              <div key={role.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                    <p className="text-sm text-gray-500 mt-1">{role.memberCount} members</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {modules.map((module) => (
                    <div key={module.id} className="border rounded p-3">
                      <h4 className="font-medium text-sm mb-2">{module.name}</h4>
                      <div className="flex flex-wrap gap-1">
                        {permissions.map((permission) => (
                          <Badge
                            key={permission}
                            variant={role.permissions[module.id]?.[permission] ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Modal */}
      <Dialog open={inviteModal} onOpenChange={setInviteModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite New Team Member</DialogTitle>
            <DialogDescription>Send an invitation to a new team member with assigned role</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newInvite.email}
                onChange={(e) => setNewInvite(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newInvite.role} onValueChange={(value) => 
                setNewInvite(prev => ({ ...prev, role: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-medium text-sm mb-2">Permissions Preview</h4>
              <p className="text-sm text-gray-600">
                Selected role permissions will be displayed here based on the chosen role.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setInviteModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMember}>
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Role Modal */}
      <Dialog open={roleModal} onOpenChange={setRoleModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
            <DialogDescription>Define role permissions and access levels for team members</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="roleName">Role Name</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <Label htmlFor="roleDescription">Description</Label>
                <Input
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter role description"
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-4">Permissions Matrix</h3>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Module</TableHead>
                      {permissions.map(permission => (
                        <TableHead key={permission} className="text-center">
                          {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.name}</TableCell>
                        {permissions.map((permission) => (
                          <TableCell key={permission} className="text-center">
                            <Checkbox
                              checked={newRole.permissions[module.id]?.[permission] || false}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(module.id, permission, !!checked)
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRoleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole}>
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}