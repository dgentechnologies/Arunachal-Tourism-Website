import { config } from 'dotenv';
config({path: '.env.local'});
config();

import '@/ai/flows/personalized-itinerary-generator-flow.ts';
import '@/ai/flows/permit-plan-completeness-check.ts';
