import { useState } from "react";
import { Search, Download, Eye, Filter, Calendar, User, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface AuditLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
    id: string;
  };
  action: string;
  module: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  userAgent: string;
  changes?: {
    before: any;
    after: any;
  };
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const mockAuditLogs: AuditLog[] = [
  {
    id: "LOG001",
    timestamp: "2024-01-30 15:45:23",
    user: { name: "Erik Lamela", role: "Admin", id: "USER001" },
    action: "UPDATE_LOAN_STATUS",
    module: "Loans",
    entity: "Loan Record",
    entityId: "LN001",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    changes: {
      before: { status: "pending", amount: 500000 },
      after: { status: "approved", amount: 500000 }
    },
    severity: "medium"
  },
  {
    id: "LOG002",
    timestamp: "2024-01-30 14:30:15",
    user: { name: "Sarah Wilson", role: "Loan Officer", id: "USER002" },
    action: "CREATE_CUSTOMER",
    module: "Customers",
    entity: "Customer Record",
    entityId: "CUST045",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    changes: {
      before: null,
      after: { name: "John Smith", email: "john@email.com", phone: "+234901234567" }
    },
    severity: "low"
  },
  {
    id: "LOG003",
    timestamp: "2024-01-30 13:22:45",
    user: { name: "David Brown", role: "Finance Manager", id: "USER003" },
    action: "EXPORT_FINANCIAL_DATA",
    module: "Reports",
    entity: "Financial Report",
    entityId: "RPT2024001",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    severity: "high"
  },
  {
    id: "LOG004",
    timestamp: "2024-01-30 12:15:30",
    user: { name: "Alice Johnson", role: "Compliance Officer", id: "USER004" },
    action: "UPDATE_CREDIT_RULES",
    module: "Credit Rules",
    entity: "Scoring Rule",
    entityId: "RULE003",
    ipAddress: "192.168.1.108",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    changes: {
      before: { scoreImpact: 15, weight: 20 },
      after: { scoreImpact: 20, weight: 25 }
    },
    severity: "medium"
  },
  {
    id: "LOG005",
    timestamp: "2024-01-30 11:45:12",
    user: { name: "Erik Lamela", role: "Admin", id: "USER001" },
    action: "DELETE_USER_ACCOUNT",
    module: "Users",
    entity: "User Account",
    entityId: "USER020",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    changes: {
      before: { name: "Former Employee", role: "Loan Officer", status: "suspended" },
      after: null
    },
    severity: "critical"
  },
  {
    id: "LOG006",
    timestamp: "2024-01-30 10:30:22",
    user: { name: "Sarah Wilson", role: "Loan Officer", id: "USER002" },
    action: "LOGIN",
    module: "Authentication",
    entity: "User Session",
    entityId: "SESSION_456",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    severity: "low"
  }
];

const actionTypes = [
  "CREATE_CUSTOMER", "UPDATE_CUSTOMER", "DELETE_CUSTOMER",
  "CREATE_LOAN", "UPDATE_LOAN_STATUS", "APPROVE_LOAN", "DECLINE_LOAN",
  "PROCESS_PAYMENT", "UPDATE_PAYMENT", "REVERSE_PAYMENT",
  "UPDATE_CREDIT_RULES", "CREATE_NOTIFICATION", "EXPORT_DATA",
  "LOGIN", "LOGOUT", "PASSWORD_CHANGE", "ROLE_CHANGE",
  "DELETE_USER_ACCOUNT", "CREATE_USER_ACCOUNT"
];

const modules = [
  "Authentication", "Customers", "Loans", "Payments", "Credit Rules", 
  "Notifications", "Reports", "Users", "Settings"
];

export function AuditLogs() {
  const [logs, setLogs] = useState(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [filters, setFilters] = useState({
    user: "",
    action: "",
    module: "",
    severity: "",
    dateFrom: "",
    dateTo: ""
  });

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUser = filters.user === "" || filters.user === "all" || log.user.name === filters.user;
    const matchesAction = filters.action === "" || filters.action === "all" || log.action === filters.action;
    const matchesModule = filters.module === "" || filters.module === "all" || log.module === filters.module;
    const matchesSeverity = filters.severity === "" || filters.severity === "all" || log.severity === filters.severity;

    return matchesSearch && matchesUser && matchesAction && matchesModule && matchesSeverity;
  });

  const handleExportLogs = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Module", "Entity", "IP Address"].join(","),
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user.name,
        log.action,
        log.module,
        log.entity,
        log.ipAddress
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatUserAgent = (userAgent: string) => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Macintosh')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    return 'Unknown';
  };

  const renderChanges = (changes: any) => {
    if (!changes) return <span className="text-gray-500">No changes recorded</span>;

    return (
      <div className="space-y-4">
        {changes.before && (
          <div>
            <h4 className="font-medium text-red-700 mb-2">Before:</h4>
            <pre className="bg-red-50 p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(changes.before, null, 2)}
            </pre>
          </div>
        )}
        {changes.after && (
          <div>
            <h4 className="font-medium text-green-700 mb-2">After:</h4>
            <pre className="bg-green-50 p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(changes.after, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  const uniqueUsers = [...new Set(logs.map(log => log.user.name))];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Audit Logs</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleExportLogs} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Total Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{logs.length}</p>
            <p className="text-sm text-gray-600">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <User className="h-4 w-4" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{uniqueUsers.length}</p>
            <p className="text-sm text-gray-600">Unique users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {logs.filter(log => log.severity === 'high' || log.severity === 'critical').length}
            </p>
            <p className="text-sm text-gray-600">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">
              {logs.filter(log => log.timestamp.startsWith('2024-01-30')).length}
            </p>
            <p className="text-sm text-gray-600">Activities logged</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filters.user} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, user: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {uniqueUsers.map(user => (
                  <SelectItem key={user} value={user}>{user}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.action} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, action: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                {actionTypes.map(action => (
                  <SelectItem key={action} value={action}>{action}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.module} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, module: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                {modules.map(module => (
                  <SelectItem key={module} value={module}>{module}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filters.severity} onValueChange={(value) => 
              setFilters(prev => ({ ...prev, severity: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              placeholder="Date From"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.user.name}</p>
                      <p className="text-sm text-gray-600">{log.user.role}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.action}</TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{log.entity}</p>
                      <p className="text-sm text-gray-600">{log.entityId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(log.severity)}>
                      {log.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>{formatUserAgent(log.userAgent)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                          asChild={false}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Audit Log Details - {selectedLog?.id}</DialogTitle>
                          <DialogDescription>View complete audit log details and data changes</DialogDescription>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Event Information</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="font-medium">Timestamp:</span> {selectedLog.timestamp}</p>
                                  <p><span className="font-medium">Action:</span> {selectedLog.action}</p>
                                  <p><span className="font-medium">Module:</span> {selectedLog.module}</p>
                                  <p><span className="font-medium">Entity:</span> {selectedLog.entity}</p>
                                  <p><span className="font-medium">Entity ID:</span> {selectedLog.entityId}</p>
                                  <p><span className="font-medium">Severity:</span> 
                                    <Badge className={`ml-2 ${getSeverityColor(selectedLog.severity)}`}>
                                      {selectedLog.severity}
                                    </Badge>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">User & Session</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="font-medium">User:</span> {selectedLog.user.name}</p>
                                  <p><span className="font-medium">Role:</span> {selectedLog.user.role}</p>
                                  <p><span className="font-medium">User ID:</span> {selectedLog.user.id}</p>
                                  <p><span className="font-medium">IP Address:</span> {selectedLog.ipAddress}</p>
                                  <p><span className="font-medium">Device:</span> {formatUserAgent(selectedLog.userAgent)}</p>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            {/* User Agent */}
                            <div>
                              <h4 className="font-medium mb-2">User Agent</h4>
                              <p className="text-sm bg-gray-50 p-2 rounded font-mono break-all">
                                {selectedLog.userAgent}
                              </p>
                            </div>

                            {/* Changes */}
                            {selectedLog.changes && (
                              <>
                                <Separator />
                                <div>
                                  <h4 className="font-medium mb-2">Data Changes</h4>
                                  {renderChanges(selectedLog.changes)}
                                </div>
                              </>
                            )}

                            {/* Export Button */}
                            <div className="flex justify-end">
                              <Button variant="outline" onClick={() => {
                                const logData = JSON.stringify(selectedLog, null, 2);
                                const blob = new Blob([logData], { type: "application/json" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `audit_log_${selectedLog.id}.json`;
                                a.click();
                                URL.revokeObjectURL(url);
                              }}>
                                <Download className="h-4 w-4 mr-2" />
                                Export Entry
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}