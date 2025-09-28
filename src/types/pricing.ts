
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
