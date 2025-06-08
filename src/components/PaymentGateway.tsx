import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, AlertCircle, Smartphone, QrCode } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  planName: string;
  onBack: () => void;
  onSuccess: () => void;
}

export function PaymentGateway({ amount, planName, onBack, onSuccess }: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onSuccess();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gold hover:text-gold/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-green-500" />
            <span className="text-green-500">Secure Payment</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-zinc-400">Plan</span>
            <span className="text-white font-medium">{planName}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-zinc-400">Amount</span>
            <span className="text-white font-medium">₹{amount}</span>
          </div>
          <div className="pt-4 border-t border-zinc-700">
            <div className="flex justify-between">
              <span className="text-zinc-400">Total</span>
              <span className="text-gold font-bold">₹{amount}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Payment Details</h2>
          
          {/* Payment Method Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                paymentMethod === 'upi'
                  ? 'bg-gold text-zinc-900'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              <Smartphone className="w-5 h-5" />
              <span>UPI</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                paymentMethod === 'card'
                  ? 'bg-gold text-zinc-900'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Card</span>
            </button>
          </div>

          {paymentMethod === 'upi' ? (
            <div className="animate-fade-in">
              {/* UPI ID Input */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    UPI ID / VPA
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                      placeholder="yourname@upi"
                      required
                    />
                    <Smartphone className="absolute right-3 top-3 text-zinc-500 w-5 h-5" />
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">
                    Enter your UPI ID to make the payment
                  </p>
                </div>

                <div className="flex items-start space-x-2 text-sm text-zinc-400">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    This is a demo UPI gateway. No actual payment will be processed.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Pay ₹{amount}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  placeholder="4242 4242 4242 4242"
                  required
                />
                <CreditCard className="absolute right-3 top-3 text-zinc-500 w-5 h-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  maxLength={3}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-gold"
                placeholder="Enter name on card"
                required
              />
            </div>

            <div className="flex items-start space-x-2 text-sm text-zinc-400">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>
                This is a demo payment gateway. Do not enter real card details.
                Use any valid-looking card number for testing.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gold text-zinc-900 rounded-lg hover:bg-gold/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Pay ₹{amount}</span>
                </>
              )}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}