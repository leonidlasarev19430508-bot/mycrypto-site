-- Migration: Add tags_en column to ai_news table
-- Purpose: Store English translations of article tags
-- This allows displaying localized tags for en/pl/de locales

ALTER TABLE ai_news ADD COLUMN IF NOT EXISTS tags_en text;

-- Tags are stored as JSON array strings, same format as tags column
-- Example: '["DeFi", "Bitcoin", "Security"]'
