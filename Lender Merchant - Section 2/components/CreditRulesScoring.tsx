import { useState } from "react";
import { Plus, Edit, Trash2, Power, Play, GripVertical, TestTube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

interface CreditRule {
  id: string;
  name: string;
  condition: string;
  conditionType: 'numeric' | 'boolean' | 'list';
  scoreImpact: number;
  weight: number;
  status: 'active' | 'inactive';
  lastUpdated: string;
  order: number;
}

const mockRules: CreditRule[] = [
  {
    id: "RULE001",
    name: "Minimum Monthly Income",
    condition: "Monthly Income ≥ ₦100,000",
    conditionType: "numeric",
    scoreImpact: 25,
    weight: 30,
    status: "active",
    lastUpdated: "2024-01-30",
    order: 1
  },
  {
    id: "RULE002",
    name: "No Existing Loans",
    condition: "Existing Loans = 0",
    conditionType: "boolean",
    scoreImpact: 20,
    weight: 25,
    status: "active",
    lastUpdated: "2024-01-29",
    order: 2
  },
  {
    id: "RULE003",
    name: "Employment Type",
    condition: "Job Title in ['Engineer', 'Doctor', 'Lawyer', 'Teacher']",
    conditionType: "list",
    scoreImpact: 15,
    weight: 20,
    status: "active",
    lastUpdated: "2024-01-28",
    order: 3
  },
  {
    id: "RULE004",
    name: "Age Range",
    condition: "Age ≥ 25 AND Age ≤ 55",
    conditionType: "numeric",
    scoreImpact: 10,
    weight: 15,
    status: "inactive",
    lastUpdated: "2024-01-25",
    order: 4
  },
  {
    id: "RULE005",
    name: "Bank Statement History",
    condition: "Bank History ≥ 6 months",
    conditionType: "numeric",
    scoreImpact: 15,
    weight: 10,
    status: "active",
    lastUpdated: "2024-01-24",
    order: 5
  }
];

const testProfile = {
  monthlyIncome: 150000,
  existingLoans: 0,
  jobTitle: "Engineer",
  age: 32,
  bankHistory: 8,
  creditScore: 0
};

export function CreditRulesScoring() {
  const [rules, setRules] = useState(mockRules);
  const [editingRule, setEditingRule] = useState<CreditRule | null>(null);
  const [newRule, setNewRule] = useState({
    name: "",
    conditionType: "numeric" as const,
    condition: "",
    scoreImpact: 0,
    weight: 0
  });
  const [ruleModal, setRuleModal] = useState(false);
  const [simulationModal, setSimulationModal] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);

  const activeRules = rules.filter(rule => rule.status === 'active').sort((a, b) => a.order - b.order);

  const handleCreateRule = () => {
    if (!newRule.name || !newRule.condition) {
      alert("Please fill all required fields");
      return;
    }

    const rule: CreditRule = {
      id: `RULE${String(rules.length + 1).padStart(3, '0')}`,
      name: newRule.name,
      condition: newRule.condition,
      conditionType: newRule.conditionType,
      scoreImpact: newRule.scoreImpact,
      weight: newRule.weight,
      status: 'active',
      lastUpdated: new Date().toISOString().split('T')[0],
      order: rules.length + 1
    };

    setRules(prev => [...prev, rule]);
    setNewRule({ name: "", conditionType: "numeric", condition: "", scoreImpact: 0, weight: 0 });
    setRuleModal(false);
    alert("Credit rule created successfully!");
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' as const }
        : rule
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      setRules(prev => prev.filter(rule => rule.id !== ruleId));
    }
  };

  const handleSimulateScoring = () => {
    const results = {
      totalScore: 0,
      maxScore: 0,
      breakdown: [] as any[]
    };

    activeRules.forEach(rule => {
      let passed = false;
      let description = "";

      // Simulate rule evaluation
      switch (rule.id) {
        case "RULE001":
          passed = testProfile.monthlyIncome >= 100000;
          description = `Monthly Income: ₦${testProfile.monthlyIncome.toLocaleString()}`;
          break;
        case "RULE002":
          passed = testProfile.existingLoans === 0;
          description = `Existing Loans: ${testProfile.existingLoans}`;
          break;
        case "RULE003":
          passed = ["Engineer", "Doctor", "Lawyer", "Teacher"].includes(testProfile.jobTitle);
          description = `Job Title: ${testProfile.jobTitle}`;
          break;
        case "RULE004":
          passed = testProfile.age >= 25 && testProfile.age <= 55;
          description = `Age: ${testProfile.age}`;
          break;
        case "RULE005":
          passed = testProfile.bankHistory >= 6;
          description = `Bank History: ${testProfile.bankHistory} months`;
          break;
      }

      results.breakdown.push({
        ruleName: rule.name,
        condition: rule.condition,
        passed,
        scoreImpact: rule.scoreImpact,
        weight: rule.weight,
        earnedScore: passed ? rule.scoreImpact : 0,
        description
      });

      results.totalScore += passed ? rule.scoreImpact : 0;
      results.maxScore += rule.scoreImpact;
    });

    setTestResults(results);
    setSimulationModal(true);
  };

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Credit Rules & Scoring</h1>
        <div className="flex items-center gap-4">
          <Button onClick={handleSimulateScoring} variant="outline" className="gap-2">
            <TestTube className="h-4 w-4" />
            Test Scoring
          </Button>
          <Button onClick={() => setRuleModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Rule
          </Button>
        </div>
      </div>

      {/* Scoring Strategy Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Scoring Strategy Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{activeRules.length}</p>
              <p className="text-sm text-blue-600">Active Rules</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {activeRules.reduce((sum, rule) => sum + rule.scoreImpact, 0)}
              </p>
              <p className="text-sm text-green-600">Max Score</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {activeRules.reduce((sum, rule) => sum + rule.weight, 0)}%
              </p>
              <p className="text-sm text-yellow-600">Total Weight</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">65</p>
              <p className="text-sm text-purple-600">Min Pass Score</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rules Table */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Rule Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Score Impact</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                  </TableCell>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{rule.condition}</TableCell>
                  <TableCell>
                    <Badge variant="outline">+{rule.scoreImpact}</Badge>
                  </TableCell>
                  <TableCell>{rule.weight}%</TableCell>
                  <TableCell>
                    <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{rule.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingRule(rule);
                          setRuleModal(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleRule(rule.id)}
                      >
                        <Power className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteRule(rule.id)}
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

      {/* Create/Edit Rule Modal */}
      <Dialog open={ruleModal} onOpenChange={setRuleModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingRule ? 'Edit Rule' : 'Create New Rule'}</DialogTitle>
            <DialogDescription>Configure credit rule parameters and scoring impact</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input
                id="ruleName"
                value={newRule.name}
                onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter rule name"
              />
            </div>
            <div>
              <Label htmlFor="conditionType">Condition Type</Label>
              <Select value={newRule.conditionType} onValueChange={(value) => 
                setNewRule(prev => ({ ...prev, conditionType: value as any }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="numeric">Numeric (e.g., income &gt; 50k)</SelectItem>
                  <SelectItem value="boolean">Boolean (e.g., has existing loan: false)</SelectItem>
                  <SelectItem value="list">List Match (e.g., job title in list)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Textarea
                id="condition"
                value={newRule.condition}
                onChange={(e) => setNewRule(prev => ({ ...prev, condition: e.target.value }))}
                placeholder="Enter condition logic"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scoreImpact">Score Impact</Label>
                <Input
                  id="scoreImpact"
                  type="number"
                  value={newRule.scoreImpact}
                  onChange={(e) => setNewRule(prev => ({ ...prev, scoreImpact: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (%)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newRule.weight}
                  onChange={(e) => setNewRule(prev => ({ ...prev, weight: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setRuleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateRule}>
                {editingRule ? 'Update Rule' : 'Create Rule'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simulation Modal */}
      <Dialog open={simulationModal} onOpenChange={setSimulationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Credit Score Simulation</DialogTitle>
            <DialogDescription>Test scoring rules with sample data to evaluate credit decisions</DialogDescription>
          </DialogHeader>
          {testResults && (
            <div className="space-y-6">
              {/* Overall Score */}
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Final Credit Score</p>
                <p className={`text-4xl font-bold ${getScoreColor(testResults.totalScore, testResults.maxScore)}`}>
                  {testResults.totalScore} / {testResults.maxScore}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {Math.round((testResults.totalScore / testResults.maxScore) * 100)}% of maximum score
                </p>
              </div>

              <Separator />

              {/* Score Breakdown */}
              <div>
                <h3 className="font-medium mb-4">Score Breakdown</h3>
                <div className="space-y-3">
                  {testResults.breakdown.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.ruleName}</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={item.passed ? 'default' : 'secondary'}>
                          {item.passed ? `+${item.earnedScore}` : '0'} points
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Weight: {item.weight}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision */}
              <div className={`p-4 rounded-lg ${
                testResults.totalScore >= 65 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`font-medium ${testResults.totalScore >= 65 ? 'text-green-800' : 'text-red-800'}`}>
                  {testResults.totalScore >= 65 ? '✅ APPROVED' : '❌ DECLINED'}
                </p>
                <p className={`text-sm ${testResults.totalScore >= 65 ? 'text-green-600' : 'text-red-600'}`}>
                  {testResults.totalScore >= 65 
                    ? 'Applicant meets minimum credit score requirements'
                    : 'Applicant does not meet minimum credit score requirements (65 points)'}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}