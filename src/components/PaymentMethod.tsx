
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { selectedPlan, billingPeriod } = location.state || {};
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Mock plan details
  const planDetails = {
    starter: { name: 'Starter Plan', price: billingPeriod === 'monthly' ? 19 : 190 },
    professional: { name: 'Professional Plan', price: billingPeriod === 'monthly' ? 54 : 540 },
    company: { name: 'Company Plan', price: billingPeriod === 'monthly' ? 89 : 890 }
  };

  const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.starter;
  const subtotal = currentPlan.price;
  const shipping = 4.48;
  const tax = 2.24;
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    navigate('/payment-success');
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                Card Number
              </Label>
              <div className="relative mt-1">
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="5399 0000 0000 0000"
                  className={`${theme === 'light' 
                    ? 'bg-white border-gray-300 text-gray-900' 
                    : 'bg-gray-700 border-gray-600 text-white'
                  } pr-12`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
                  <div className="w-6 h-4 bg-yellow-500 rounded-sm"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                  Expiration Date
                </Label>
                <Input
                  id="expiry"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className={theme === 'light' 
                    ? 'bg-white border-gray-300 text-gray-900' 
                    : 'bg-gray-700 border-gray-600 text-white'
                  }
                />
              </div>
              <div>
                <Label htmlFor="cvv" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="***"
                  className={theme === 'light' 
                    ? 'bg-white border-gray-300 text-gray-900' 
                    : 'bg-gray-700 border-gray-600 text-white'
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="saveCard"
                checked={saveCard}
                onCheckedChange={(checked) => setSaveCard(checked as boolean)}
              />
              <Label htmlFor="saveCard" className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Save card details
              </Label>
            </div>
          </div>
        );
      
      case 'bank':
        return (
          <div className="space-y-6">
            <Select>
              <SelectTrigger className={theme === 'light' 
                ? 'bg-white border-gray-300 text-gray-900' 
                : 'bg-gray-700 border-gray-600 text-white'
              }>
                <SelectValue placeholder="Choose your bank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="polaris">Polaris Bank</SelectItem>
                <SelectItem value="gtbank">GTBank</SelectItem>
                <SelectItem value="zenith">Zenith Bank</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-center py-8">
              <div className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Polaris Bank
              </div>
              <div className={`text-4xl font-mono mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                0123456789
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
                Expires in 10:00 minutes
              </div>
            </div>
          </div>
        );
      
      case 'crypto':
        return (
          <div className="space-y-6">
            <div>
              <Label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Select Cryptocurrencies
              </Label>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {[
                  { name: 'Bitcoin', icon: '₿', color: 'bg-orange-500' },
                  { name: 'Ethereum', icon: 'Ξ', color: 'bg-blue-500' },
                  { name: 'Bitcoin Cash', icon: '₿', color: 'bg-green-500' },
                  { name: 'Dash', icon: 'D', color: 'bg-blue-600' },
                  { name: 'Litecoin', icon: 'Ł', color: 'bg-gray-500' },
                  { name: 'Zcash', icon: 'Z', color: 'bg-yellow-500' },
                  { name: 'USDT (TRC-20)', icon: '₮', color: 'bg-teal-500' }
                ].map((crypto, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full ${crypto.color} flex items-center justify-center text-white text-xs font-bold`}>
                      {crypto.icon}
                    </div>
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {crypto.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center py-8">
              <div className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Crypto Address
              </div>
              <div className={`text-2xl font-mono mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'} break-all`}>
                n3STqrrKbTLnZM7Su79IE...
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`}>
                Expires in 10:00 minutes
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-4`}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Payment Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-gray-200 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Payment
            </h2>
            
            <div className="mb-6">
              <Label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                Pay With:
              </Label>
              <div className="flex space-x-4 mt-3">
                {[
                  { key: 'card', label: 'Card' },
                  { key: 'bank', label: 'Bank Transfer' },
                  { key: 'crypto', label: 'Cryptocurrency' }
                ].map((method) => (
                  <label key={method.key} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.key}
                      checked={paymentMethod === method.key}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="mr-2 text-green-500"
                    />
                    <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {method.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {renderPaymentForm()}

            <Button
              onClick={handlePayment}
              disabled={processing}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium"
            >
              {processing ? 'Processing...' : `Pay USD${total.toFixed(2)}`}
            </Button>

            <p className={`text-xs mt-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
              Your personal data will be used to process your order, support your experience 
              throughout this website, and for other purposes described in our privacy policy.
            </p>
          </Card>
        </motion.div>

        {/* Order Summary Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-gray-200 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm p-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Contact Details
            </h2>
            
            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Full Name</span>
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Email</span>
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>JohnDoe@gmail.com</span>
              </div>
              <div className="flex justify-between">
                <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Mobile</span>
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>+234834567923</span>
              </div>
            </div>

            <h3 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Order Summary
            </h3>
            
            <div className="mb-6">
              <h4 className={`font-medium mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Order Detail
              </h4>
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                    {currentPlan.name}
                  </div>
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-200' : 'text-gray-200'}`}>
                    {billingPeriod === 'monthly' ? 'Monthly subscription' : 'Yearly subscription'}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold ${theme === 'light' ? 'text-white' : 'text-white'}`}>
                    ${currentPlan.price}
                  </div>
                  <div className={`text-sm ${theme === 'light' ? 'text-gray-200' : 'text-gray-200'}`}>
                    Qty: 1
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Subtotal</span>
                <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>Shipping</span>
                <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  ${shipping}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3">
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>Total</span>
                <span className={theme === 'light' ? 'text-gray-900' : 'text-white'}>
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                Including ${tax} in taxes
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentMethod;
