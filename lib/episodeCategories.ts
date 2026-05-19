export const EPISODE_CATEGORIES = [
  "All Categories",
  "Bitcoin",
  "Ethereum",
  "DeFi",
  "Solana",
  "Avalanche",
  "Polygon",
  "Cardano",
  "NFT",
  "Layer 2",
  "MEME",
  "Lending",
  "Stablecoins",
  "GameFi",
  "SocialFi",
  "RWA",
  "DAO",
  "Wallets",
  "Chainlink",
  "Privacy",
  "Web3",
  "Regulation",
  "Cross-Chain",
  "Metaverse",
  "Staking",
  "Yield Farming",
  "BNB Chain",
] as const;

export function selectedFilterTags(categories: string[]): string[] | undefined {
  if (categories.includes("All Categories")) {
    return undefined;
  }
  return categories;
}
