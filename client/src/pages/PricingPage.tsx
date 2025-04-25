import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  popular?: boolean;
}

const PricingPage = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'lifetime'>('monthly');
  
  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free Trial',
      price: '$0',
      description: 'Perfect for trying out the service',
      features: [
        'First offer clarity generation',
        'One contract generation',
        'PDF export',
        'Limited AI requests'
      ],
      ctaText: 'Start for Free',
      ctaLink: '/offer-clarity'
    },
    {
      id: billingPeriod === 'monthly' ? 'monthly' : 'lifetime',
      name: billingPeriod === 'monthly' ? 'Pro' : 'Lifetime Access',
      price: billingPeriod === 'monthly' ? '$29/month' : '$99 one-time',
      description: billingPeriod === 'monthly' 
        ? 'Everything you need for ongoing client work'
        : 'Pay once, use forever',
      features: [
        'Unlimited offer clarity rewrites',
        'Unlimited contract generation',
        'PDF & Google Doc export',
        'Custom contract templates',
        'Priority support',
        ...(billingPeriod === 'lifetime' ? ['No recurring payments', 'All future updates'] : [])
      ],
      ctaText: billingPeriod === 'monthly' ? 'Subscribe Now' : 'Buy Lifetime Access',
      ctaLink: '/register',
      popular: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
          Get clear on what you sell and get paid with confidence.
        </p>
      </div>

      <div className="mt-12 flex justify-center">
        <div className="relative bg-white rounded-lg p-1 flex">
          <button
            type="button"
            className={`relative py-2 px-6 rounded-md text-sm font-medium whitespace-nowrap ${
              billingPeriod === 'monthly'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`relative py-2 px-6 rounded-md text-sm font-medium whitespace-nowrap ${
              billingPeriod === 'lifetime'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={() => setBillingPeriod('lifetime')}
          >
            Lifetime
          </button>
        </div>
      </div>

      <div className="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${
              plan.popular ? 'border-blue-500 border-2' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center text-sm font-medium py-1 rounded-t-md">
                MOST POPULAR
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-medium text-gray-900">{plan.name}</h2>
              <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.id === 'monthly' && (
                  <span className="text-base font-medium text-gray-500">/month</span>
                )}
              </p>
              <Link
                to={plan.ctaLink}
                className={`mt-8 block w-full bg-blue-600 border border-transparent rounded-md py-3 px-6 text-center font-medium text-white hover:bg-blue-700`}
              >
                {plan.ctaText}
              </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-sm font-medium text-gray-900">What's included</h3>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3 text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg divide-y divide-gray-200 lg:max-w-4xl lg:mx-auto">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-medium text-gray-900">Frequently asked questions</h2>
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I try it before I pay?</h3>
              <p className="mt-2 text-base text-gray-600">
                Yes! You can generate one offer clarity and one contract for free. No credit card required.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Can I cancel anytime?</h3>
              <p className="mt-2 text-base text-gray-600">
                Yes, you can cancel your monthly subscription at any time. You won't be charged after your current billing period ends.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">How does the lifetime option work?</h3>
              <p className="mt-2 text-base text-gray-600">
                Pay once, use forever. You'll have access to all features and receive all future updates with no additional charges.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Are the contracts legally binding?</h3>
              <p className="mt-2 text-base text-gray-600">
                Our contracts are created with legal best practices, but we recommend having them reviewed by your own lawyer for your specific business needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 