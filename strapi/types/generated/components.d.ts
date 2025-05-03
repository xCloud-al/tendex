import type { Schema, Struct } from '@strapi/strapi';

export interface ScoreScoreSummary extends Struct.ComponentSchema {
  collectionName: 'components_score_score_summaries';
  info: {
    description: '';
    displayName: 'ScoreSummary';
  };
  attributes: {
    comment: Schema.Attribute.Text;
    criterion: Schema.Attribute.String;
    is_automatic: Schema.Attribute.Boolean;
    score: Schema.Attribute.BigInteger;
    weight: Schema.Attribute.BigInteger;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'score.score-summary': ScoreScoreSummary;
    }
  }
}
