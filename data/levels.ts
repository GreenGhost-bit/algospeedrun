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
    title: "Decentralization via PPoS",
    description: "Understand VRF and sortition.",
    textToType: "Algorand uses a verifiable random function to securely and secretly select committees. This ensures that the protocol is highly decentralized and immune to attacks. Every user has a proportional chance to propose and vote on blocks.",
    targetWpm: 45,
  },
  {
    id: 3,
    title: "Algorand Standard Assets",
    description: "Explore Layer 1 tokens on Algorand.",
    textToType: "ASAs provide a standardized, Layer-1 mechanism to represent any type of asset on the Algorand blockchain. These include fungible, non-fungible, restricted fungible, and restricted non-fungible tokens. They benefit from the same high security and speed.",
    targetWpm: 50,
  },
  {
    id: 4,
    title: "Atomic Transfers",
    description: "Execute simultaneous transactions securely.",
    textToType: "Atomic transfers are a Layer-1 feature that allows multiple transactions to be grouped together. Either all transactions in the group succeed, or none of them do. This eliminates the need for escrow accounts or complex smart contracts for simple trades.",
    targetWpm: 55,
  },
  {
    id: 5,
    title: "Smart Contracts",
    description: "Dive into Turing-complete smart contracts.",
    textToType: "Algorand Smart Contracts are pieces of logic that reside on the blockchain. They are written in TEAL and operate securely at Layer-1 speed. They can manage ASAs, create new tokens, and execute complex decentralized applications.",
    targetWpm: 60,
  },
  {
    id: 6,
    title: "PyTeal Basics",
    description: "Write your first smart contract in PyTeal.",
    textToType: "import pyteal as pt\n\ndef approval_program():\n    return pt.Return(pt.Int(1))\n\ndef clear_state_program():\n    return pt.Return(pt.Int(1))",
    targetWpm: 40,
  },
  {
    id: 7,
    title: "TEALScript",
    description: "TypeScript for Algorand.",
    textToType: "import { Contract } from '@algorandfoundation/tealscript';\n\nclass HelloWorld extends Contract {\n  hello(name: string): string {\n    return 'Hello, ' + name;\n  }\n}",
    targetWpm: 45,
  },
  {
    id: 8,
    title: "State Proofs",
    description: "Interoperability without centralized bridges.",
    textToType: "Algorand State Proofs are a new interoperability standard that securely connects blockchains without trust in a centralized intermediary. They are cryptographically robust and power trustless bridges to other ecosystems.",
    targetWpm: 65,
  },
  {
    id: 9,
    title: "Quantum Resiliency",
    description: "State-of-the-art cryptography for the future.",
    textToType: "Algorand is preparing for the post-quantum computing era by introducing state proofs that use advanced post-quantum cryptography. This upgrades the network to withstand attacks from future quantum computers, protecting user data for generations.",
    targetWpm: 70,
  },
  {
    id: 10,
    title: "Silvio's Vision",
    description: "Complete the ultimate challenge to earn your praise.",
    textToType: "We have the opportunity to build a new economy. An economy where value can be exchanged as easily as information. Algorand is the foundation for this borderless economy. It is truly decentralized, secure, and infinitely scalable.",
    targetWpm: 80,
  }
];
