export interface LevelData {
  id: number;
  title: string;
  description: string;
  textToType: string;
  targetWpm: number;
}

export const levels: LevelData[] = [
  {
    id: 1,
    title: "The Borderless Economy",
    description: "Learn the core principles of Algorand.",
    textToType: "Algorand is a pure proof-of-stake blockchain protocol. It delivers instant transaction finality without forking. It is designed to process thousands of transactions per second with sub-penny fees, making the borderless economy a reality.",
    targetWpm: 40,
  },
  {
    id: 2,
    title: "PyTeal Basics",
    description: "Write your first smart contract in PyTeal.",
    textToType: "import pyteal as pt\n\ndef approval_program():\n    return pt.Return(pt.Int(1))\n\ndef clear_state_program():\n    return pt.Return(pt.Int(1))",
    targetWpm: 35, // slightly slower for code
  },
  {
    id: 3,
    title: "Silvio's Vision",
    description: "Complete the ultimate challenge to earn your praise.",
    textToType: "We have the opportunity to build a new economy. An economy where value can be exchanged as easily as information. Algorand is the foundation for this borderless economy. It is truly decentralized, secure, and infinitely scalable.",
    targetWpm: 50,
  }
];
