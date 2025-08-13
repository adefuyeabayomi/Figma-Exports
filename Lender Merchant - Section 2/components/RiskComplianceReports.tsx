import { useState } from "react";
import { Search, Shield, AlertTriangle, Download, Eye, Flag, FileText, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const kycStats = {
  totalCustomers: 1245,
  fullyVerified: 1089,
  pendingDocuments: 98,
  flaggedProfiles: 58,
  verificationRate: 87.5
};

const riskDistribution = [
  { category: 'Low Risk', count: 856, percentage: 68.8 },
  { category: 'Medium Risk', count: 298, percentage: 23.9 },
  { category: 'High Risk', count: 67, percentage: 5.4 },
  { category: 'Fraudulent', count: 24, percentage: 1.9 }
];

const complianceIncidents = [
  {
    id: "INC001",
    date: "2024-01-30",
    type: "Suspicious Transaction",
    customer: "John Doe",
    description: "Multiple loan applications with different documents",
    status: "Under Review",
    priority: "High",
    assignedTo: "Compliance Team"
  },
  {
    id: "INC002",
    date: "2024-01-29",
    type: "KYC Mismatch",
    customer: "Jane Smith",
    description: "Address verification failed",
    status: "Resolved",
    priority: "Medium",
    assignedTo: "Sarah Wilson"
  },
  {
    id: "INC003",
    date: "2024-01-28",
    type: "Document Fraud",
    customer: "Mike Johnson",
    description: "Tampered ID document detected",
    status: "Escalated",
    priority: "Critical",
    assignedTo: "Legal Team"
  }
];

const auditLogs = [
  {
    date: "2024-01-30 15:45",
    user: "Erik Lamela",
    action: "Generated Compliance Report",
    target: "Monthly KYC Summary",
    ipAddress: "192.168.1.100"
  },
  {
    date: "2024-01-30 14:20",
    user: "Sarah Wilson",
    action: "Updated Customer Risk Level",
    target: "Customer ID: CUST001",
    ipAddress: "192.168.1.102"
  },
  {
    date: "2024-01-30 10:15",
    user: "David Brown",
    action: "Flagged Suspicious Activity",
    target: "Transaction: TXN123456",
    ipAddress: "192.168.1.105"
  },
  {
    date: "2024-01-29 16:30",
    user: "Alice Johnson",
    action: "Submitted SAR Report",
    target: "Customer ID: CUST045",
    ipAddress: "192.168.1.108"
  }
];

const approvalTimelines = [
  { stage: 'Application Received', avgTime: 0.5, target: 1 },
  { stage: 'KYC Verification', avgTime: 2.3, target: 2 },
  { stage: 'Credit Assessment', avgTime: 1.8, target: 1.5 },
  { stage: 'Final Approval', avgTime: 0.7, target: 0.5 },
  { stage: 'Disbursement', avgTime: 0.9, target: 1 }
];

export function RiskComplianceReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sarModal, setSarModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [sarReport, setSarReport] = useState({
    customerName: "",
    suspiciousActivity: "",
    amount: "",
    description: ""
  });

  const filteredIncidents = complianceIncidents.filter(incident =>
    incident.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitSAR = () => {
    if (!sarReport.customerName || !sarReport.suspiciousActivity) {
      alert("Please fill all required fields");
      return;
    }
    alert("Suspicious Activity Report submitted successfully!");
    setSarModal(false);
    setSarReport({
      customerName: "",
      suspiciousActivity: "",
      amount: "",
      description: ""
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Risk & Compliance Reports</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export All Logs
          </Button>
          <Button onClick={() => setSarModal(true)} className="gap-2">
            <Flag className="h-4 w-4" />
            Submit SAR
          </Button>
        </div>
      </div>

      {/* KYC Verification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{kycStats.totalCustomers.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Fully Verified</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{kycStats.fullyVerified.toLocaleString()}</p>
            <p className="text-sm text-green-600">{kycStats.verificationRate}% completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">{kycStats.pendingDocuments}</p>
            <p className="text-sm text-gray-600">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Flagged Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{kycStats.flaggedProfiles}</p>
            <p className="text-sm text-red-600">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={68.8} className="h-2" />
              <p className="text-sm text-gray-600">68.8% Low Risk</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution & Approval Timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Classifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskDistribution.map((risk, index) => (
                <div key={risk.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      risk.category === 'Low Risk' ? 'bg-green-500' :
                      risk.category === 'Medium Risk' ? 'bg-yellow-500' :
                      risk.category === 'High Risk' ? 'bg-orange-500' :
                      'bg-red-500'
                    }`} />
                    <span className="font-medium">{risk.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{risk.count}</p>
                    <p className="text-sm text-gray-600">{risk.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Approval Timelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {approvalTimelines.map((stage, index) => (
                <div key={stage.stage} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{stage.stage}</span>
                    <span className={stage.avgTime > stage.target ? 'text-red-600' : 'text-green-600'}>
                      {stage.avgTime} days (Target: {stage.target})
                    </span>
                  </div>
                  <Progress 
                    value={(stage.avgTime / (stage.target * 2)) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Incidents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Compliance Incidents</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIncidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-medium">{incident.id}</TableCell>
                  <TableCell>{incident.date}</TableCell>
                  <TableCell>{incident.type}</TableCell>
                  <TableCell>{incident.customer}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(incident.priority)}>
                      {incident.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{incident.assignedTo}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedIncident(incident)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Incident Details - {selectedIncident?.id}</DialogTitle>
                        </DialogHeader>
                        {selectedIncident && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium">Incident Type</h4>
                              <p className="text-sm text-gray-600">{selectedIncident.type}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Description</h4>
                              <p className="text-sm text-gray-600">{selectedIncident.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Customer</h4>
                              <p className="text-sm text-gray-600">{selectedIncident.customer}</p>
                            </div>
                            <div>
                              <h4 className="font-medium">Status & Priority</h4>
                              <div className="flex gap-2">
                                <Badge className={getStatusColor(selectedIncident.status)}>
                                  {selectedIncident.status}
                                </Badge>
                                <Badge className={getPriorityColor(selectedIncident.priority)}>
                                  {selectedIncident.priority}
                                </Badge>
                              </div>
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

      {/* Internal Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{log.date}</TableCell>
                  <TableCell>{log.user}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell className="text-gray-600">{log.target}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.ipAddress}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* SAR Submission Modal */}
      <Dialog open={sarModal} onOpenChange={setSarModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Suspicious Activity Report (SAR)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={sarReport.customerName}
                onChange={(e) => setSarReport(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <Label htmlFor="suspiciousActivity">Type of Suspicious Activity</Label>
              <Select value={sarReport.suspiciousActivity} onValueChange={(value) => 
                setSarReport(prev => ({ ...prev, suspiciousActivity: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identity-fraud">Identity Fraud</SelectItem>
                  <SelectItem value="document-fraud">Document Fraud</SelectItem>
                  <SelectItem value="money-laundering">Money Laundering</SelectItem>
                  <SelectItem value="suspicious-transaction">Suspicious Transaction Pattern</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount Involved (if applicable)</Label>
              <Input
                id="amount"
                type="number"
                value={sarReport.amount}
                onChange={(e) => setSarReport(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                value={sarReport.description}
                onChange={(e) => setSarReport(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide detailed description of the suspicious activity..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSarModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitSAR}>
                Submit SAR
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}