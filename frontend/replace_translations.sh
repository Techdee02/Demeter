#!/bin/bash
# Script to replace hardcoded text with translation variables

FILE="/workspaces/Demeter/frontend/src/app/page.tsx"

# Navigation
sed -i 's/>Problem</>{\nav\.problem}</g' "$FILE"
sed -i 's/>Solution</>{\nav\.solution}</g' "$FILE"
sed -i 's/>Story</>{\nav\.story}</g' "$FILE"
sed -i 's/>Metrics</>{\nav\.metrics}</g' "$FILE"

# Problem section
sed -i 's/>The Crisis</>{\problem\.badge}</g' "$FILE"
sed -i 's/>Climate Volatility is Devastating</>{\problem\.title1}</g' "$FILE"
sed -i 's/>Smallholder Farmers</>{\problem\.title2}</g' "$FILE"
sed -i 's/>Without predictive tools, farmers make critical decisions/>{problem\.subtitle}/g' "$FILE"

echo "Replacements complete"
