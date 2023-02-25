# lepus

NFTとAstar Dapps stakingのイベントに基づいたOn-chain Identity Scoring System

SubQueryを利用してastarのトランザクションイベントから二つのOn-chain Identity Scoring Systemを実装しました。また、確認するためのリーダーボードを実装しました。

- NFT先見の明
  - https://github.com/lepus-shinagawa/lepus/issues/3
- Astar Dapps stakingへの貢献度可視化
  - https://github.com/lepus-shinagawa/lepus/issues/17
- リーダーボード
  - https://lepus-shinagawa.github.io/docs/

## SubQuery実装

- tofuNFTのトランザクションの集計スクリプト
  - lepus-subql/src/mappings/tofuNFTMappingHandlers.ts
- dappsのステーキングに関する集計スクリプト
  - lepus-subql/src/mappings/dapps-staking.ts

## Leader board UI実装

lepus-ui/
