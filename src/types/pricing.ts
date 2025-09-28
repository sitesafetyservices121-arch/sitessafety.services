
// src/types/pricing.ts - Create proper types for pricing
export interface BasePricingOption {
  price: number;
  per: string;
  description: string;
  minDays?: number; // Make minDays optional on all pricing options
}

export interface StandardPricingOption extends BasePricingOption {
  minDays: number; // Required for certain options
}

// Type guard to check if option has minDays
export function hasMinDays(option: BasePricingOption): option is StandardPricingOption {
  return 'minDays' in option && typeof option.minDays === 'number';
}

// Usage in your pricing components:
// Instead of directly accessing option.minDays, use:

// Option 1: Type guard
if (hasMinDays(option)) {
  const minDays = option.minDays; // TypeScript now knows this exists
}

// Option 2: Optional chaining
const minDays = option.minDays ?? 0; // Provide default value

// Option 3: In your pricing data, ensure all objects have consistent structure
export const pricingOptions: BasePricingOption[] = [
  {
    price: 100,
    per: "day", 
    description: "Basic service",
    // minDays is optional here
  },
  {
    price: 200,
    per: "day",
    minDays: 3,
    description: "Premium service with minimum requirement"
  }
];

// Example component fix:
export function PricingComponent({ option }: { option: BasePricingOption }) {
  return (
    <div>
      <p>Price: R{option.price} per {option.per}</p>
      {option.minDays && (
        <p>Minimum {option.minDays} days required</p>
      )}
      <p>{option.description}</p>
    </div>
  );
}
