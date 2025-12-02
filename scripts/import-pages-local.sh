#!/bin/bash

# Import Pages to Sanity - Run this from your local computer
# This uses the Sanity CLI to import the pages

echo "🚀 Importing pages to Sanity..."
echo ""

# Check if sanity CLI is installed
if ! command -v sanity &> /dev/null; then
    echo "❌ Sanity CLI not found. Installing..."
    npm install -g @sanity/cli
fi

cd "$(dirname "$0")/.."

# Use the NDJSON import file
echo "📦 Importing from sanity-pages-import.ndjson..."
sanity dataset import sanity-pages-import.ndjson production --replace

echo ""
echo "✅ Import complete!"
echo "🎉 Check your Sanity Studio: https://kevin-franz-jr.sanity.studio/"
