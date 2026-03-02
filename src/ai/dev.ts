import { config } from 'dotenv';
config();
config({path: '.env.local', override: true});

import '@/ai/flows/personalized-itinerary-generator-flow.ts';
import '@/ai/flows/permit-plan-completeness-check.ts';
