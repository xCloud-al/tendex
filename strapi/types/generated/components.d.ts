import type { Schema, Struct } from '@strapi/strapi';

export interface OfferCriteriaVerification extends Struct.ComponentSchema {
  collectionName: 'components_offer_criteria_verifications';
  info: {
    displayName: 'CriteriaVerification';
  };
  attributes: {
    criteria_name: Schema.Attribute.String;
    criteria_status: Schema.Attribute.Enumeration<['PASS', 'FAIL']>;
    evidence_found: Schema.Attribute.Text;
    requirement_source: Schema.Attribute.Text;
  };
}

export interface OfferVendor extends Struct.ComponentSchema {
  collectionName: 'components_offer_vendors';
  info: {
    description: '';
    displayName: 'Vendor';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.Enumeration<['AL', 'US', 'UK']>;
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String;
    phone_number: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'offer.criteria-verification': OfferCriteriaVerification;
      'offer.vendor': OfferVendor;
    }
  }
}
