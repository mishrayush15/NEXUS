import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, Sparkles, Bot, MessageSquare, Zap, Crown } from 'lucide-react';
import { createSubscription } from '../services/stripe';

const features = [
  'Access to all AI companions',
  'Unlimited messages',
  'Priority response time',
  'Advanced customization',
  'Exclusive companions',
  'Voice chat support',
  'Custom AI companions',
  'Priority support'
];

const plans = [
  {
    name: 'Monthly',
    price: '₹99',
    period: 'month',
    features,
    savings: null,
    icon: MessageSquare,
    color: 'gold'
  },
  {
    name: '6 Months',
    price: '₹549',
    period: '6 months',
    perMonth: '₹91.50/mo',
    features,
    savings: '28%',
    icon: Crown,
    color: 'purple',
    popular: true
  },
  {
    name: '12 Months',
    price: '₹999',
    period: 'year',
    perMonth: '₹83.25/mo',
    features,
    savings: '39%',
    icon: Zap,
    color: 'emerald'
  }
];

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const navigate = useNavigate();

  const handleSubscribe = async (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (!plan) return;

    // First try to create Stripe subscription
    try {
      await createSubscription(planName);
    } catch (error) {
      console.error('Stripe subscription error:', error);
    }

    // Navigate to payment page
    onClose();
    navigate('/upgrade/payment');
  };

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-zinc-900 rounded-xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-gold" />
              <h2 className="text-2xl font-bold text-white">Upgrade Your Experience</h2>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-2 text-zinc-400">
            Choose the perfect plan to enhance your AI interactions
          </p>
        </div>

        {/* Plans */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-zinc-800/50 rounded-xl overflow-hidden ${
                  plan.popular ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 text-sm font-medium rounded-bl-xl">
                    Best Value
                  </div>
                )}
                
                <div className="p-6">
                  {/* Plan Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${plan.color}/10 flex items-center justify-center`}>
                      <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div>
                        <p className="text-gold font-medium">{plan.price}</p>
                        {plan.perMonth && (
                          <p className="text-sm text-zinc-400">{plan.perMonth}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {plan.savings && (
                    <div className="mb-4 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-sm inline-block">
                      Save {plan.savings}
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-2 text-zinc-300">
                        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Subscribe Button */}
                  <button
                    onClick={() => handleSubscribe(plan.name)}
                    className={`w-full py-3 rounded-lg transition-colors font-medium ${
                      plan.popular ? 'bg-purple-500 text-white hover:bg-purple-600' :
                      plan.name === 'Monthly' ? 'bg-gold text-zinc-900 hover:bg-gold/90' :
                      'bg-emerald-500 text-white hover:bg-emerald-600'
                    }`}
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-800/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-zinc-400">
              <MessageSquare className="w-5 h-5" />
              <span>Need help? Contact our support team</span>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}