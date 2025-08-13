import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, Plus } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₦50,000',
    period: 'monthly',
    features: ['Up to 100 loans/month', 'Basic support', '10,000 API calls'],
    merchants: 23,
  },
  {
    name: 'Professional',
    price: '₦150,000',
    period: 'monthly',
    features: ['Up to 500 loans/month', 'Priority support', '50,000 API calls', 'Advanced analytics'],
    merchants: 45,
  },
  {
    name: 'Enterprise',
    price: '₦500,000',
    period: 'monthly',
    features: ['Unlimited loans', '24/7 support', 'Unlimited API calls', 'Custom integrations'],
    merchants: 12,
  },
];

export function PlansAndBilling() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Plans & Billing</h1>
          <p className="text-muted-foreground">Manage subscription plans and billing</p>
        </div>
        <Button>
          <Plus size={16} className="mr-2" />
          Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active merchants</span>
                  <Badge variant="secondary">{plan.merchants}</Badge>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                Edit Plan
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}