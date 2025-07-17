// import { loadStripe } from '@stripe/stripe-js';

// // Initialize Stripe
// export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // Subscription plans configuration
// export const stripePlans = {
//   monthly: {
//     name: 'Monthly',
//     priceId: 'price_monthly', // Replace with actual Stripe price ID
//     amount: 9900, // ₹99.00 in paise
//   },
//   sixMonths: {
//     name: '6 Months',
//     priceId: 'price_6months', // Replace with actual Stripe price ID
//     amount: 54900, // ₹549.00 in paise
//   },
//   yearly: {
//     name: '12 Months',
//     priceId: 'price_12months', // Replace with actual Stripe price ID
//     amount: 99900, // ₹999.00 in paise
//   },
// };

// // Helper function to format price in Indian Rupees
// export const formatPrice = (amount: number) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(amount / 100);
// };

// // Function to handle subscription checkout
// export const createSubscription = async (planName: string) => {
//   try {
//     const stripe = await stripePromise;
//     if (!stripe) {
//       console.log('Stripe not initialized, falling back to demo payment gateway');
//       return;
//     }

//     const plan = Object.values(stripePlans).find(p => p.name === planName);
//     if (!plan) throw new Error('Invalid plan selected');

//     // Since this is a demo, we'll just log the attempt and let it fall through to the demo payment gateway
//     console.log('Would create Stripe subscription for plan:', plan.name);
//     return;
//   } catch (error) {
//     console.error('Subscription error:', error);
//     // Let it fall through to demo payment gateway
//     return;
//   }
// };
