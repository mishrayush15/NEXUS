// PricingModal.tsx with Framer Motion animated step transitions
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, Sparkles, MessageSquare, Zap, Crown } from 'lucide-react';
import { createSubscription } from '../services/stripe';
import { motion, AnimatePresence } from 'framer-motion';

const advantages = [
  {
    title: 'Unlimited AI Character Access',
    description:
      'Say goodbye to per-character limits. Engage with as many AI personalities as you want, whenever you want — without any waiting or pay-per-use restrictions.',
    bg: '/assets/perks/unlimited.jpg'
  },
  {
    title: 'Completely Ad-Free Experience',
    description:
      'Focus entirely on immersive conversations. No interruptions, no clutter — just you and your AI companions.',
    bg: '/assets/perks/adfree.jpg'
  },
  {
    title: 'Priority Omegle Queue Matching',
    description:
      'Get connected faster than ever in Omegle-like AI spaces. Subscribers jump the queue with instant matching power.',
    bg: '/assets/perks/priority.jpg'
  },
  {
    title: 'Up to 10 Group Chats',
    description:
      'Expand your interactions with support for up to 10 concurrent group chats — perfect for managing communities, roleplay, or collaborative creativity.',
    bg: '/assets/perks/groupchats.jpg'
  }
];

const plans = [
  {
    name: 'LITE',
    duration: 'Monthly',
    originalPrice: 99,
    discount: '10%',
    price: 89,
    effectiveMonthly: '₹89/month',
    validity: '1 Month',
    icon: MessageSquare,
    color: 'gold'
  },
  {
    name: 'PLUS',
    duration: '3-Monthly',
    originalPrice: 299,
    discount: '20%',
    price: 240,
    effectiveMonthly: '₹80/month',
    validity: '3 Months',
    icon: Sparkles,
    color: 'amber'
  },
  {
    name: 'PRIME',
    duration: '6-Monthly',
    originalPrice: 599,
    discount: '40%',
    price: 359,
    effectiveMonthly: '₹59.83/month',
    validity: '6 Months',
    icon: Zap,
    color: 'emerald',
    popular: true
  },
  {
    name: 'PREMIUM',
    duration: '12-Monthly',
    originalPrice: 1199,
    discount: '50%',
    price: 480,
    effectiveMonthly: '₹40/month',
    validity: '12 Months',
    icon: Crown,
    color: 'purple'
  }
];

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<'advantages' | 'plans'>('advantages');

  const handleSubscribe = async (planName: string, price: number) => {
    try {
      await createSubscription(planName);
    } catch (error) {
      console.error('Stripe subscription error:', error);
    }
    onClose();
    navigate(`/payment?plan=${encodeURIComponent(planName)}&amount=${price}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-[90rem] bg-zinc-900 rounded-2xl overflow-hidden animate-fade-in shadow-xl">
        {/* Header */}
        <div className="p-8 border-b border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-gold" />
              <h2 className="text-3xl font-bold text-white">
                {step === 'advantages' ? 'Why Choose Nexus?' : 'Choose Your Plan'}
              </h2>
            </div>
            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-300 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="mt-3 text-zinc-400 text-lg">
            {step === 'advantages'
              ? 'All Nexus plans are crafted to deliver unparalleled AI interaction without limits.'
              : 'Select a plan that fits your lifestyle and unlock exclusive capabilities.'}
          </p>
        </div>

        {/* Animated Sections */}
        <AnimatePresence mode="wait">
          {step === 'advantages' ? (
            <motion.div
              key="advantages"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8"
            >
              {advantages.map((perk, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden relative shadow-md group hover:shadow-xl transition-shadow"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"
                  />
                  <img
                    src={perk.bg}
                    alt={perk.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="relative z-20 p-6 h-full flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold mb-2">{perk.title}</h3>
                    <p className="text-zinc-300 text-sm leading-relaxed">{perk.description}</p>
                  </div>
                </div>
              ))}
              <div className="md:col-span-2 flex justify-center mt-10">
                <button
                  onClick={() => setStep('plans')}
                  className="px-8 py-3 bg-gold text-zinc-900 rounded-lg text-lg font-semibold hover:bg-gold/90 transition-colors"
                >
                  View Pricing Plans
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="plans"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative bg-zinc-800/50 rounded-xl overflow-hidden border border-zinc-700 ${
                      plan.popular ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-emerald-500 text-white px-4 py-1 text-sm font-medium rounded-bl-xl">
                        Most Popular
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-${plan.color}/10 flex items-center justify-center`}>
                          <plan.icon className={`w-6 h-6 text-${plan.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                          <p className="text-sm text-zinc-400">{plan.validity}</p>
                          <p className="text-gold font-semibold">₹{plan.price}</p>
                          <p className="text-xs text-zinc-400 line-through">₹{plan.originalPrice}</p>
                          <p className="text-xs text-green-400">Save {plan.discount}</p>
                          <p className="text-xs text-zinc-500">{plan.effectiveMonthly}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleSubscribe(plan.name, plan.price)}
                        className={`w-full py-3 rounded-lg font-medium transition-colors bg-${plan.color}-500 text-white hover:bg-${plan.color}-600`}
                      >
                        Choose {plan.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
