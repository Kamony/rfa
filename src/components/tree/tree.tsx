import React from 'react';
import { TreeNode, TreeNodeType } from './tree-node/tree-node';

// type NodePayload = { name: string; value: any }[];
//
// type tree-node = {
//   id: string;
//   label: string;
//   descendents?: tree-node[];
//   data?: NodePayload;
// };

// const Node: tree-node = {
//   id: "koren",
//   label: "koren koren koren koren",
//   data: [
//     { name: "celed", value: "brouk" },
//     { name: "pocet nohou", value: 12 },
//     { name: "pocet nohou a rukou", value: 12 },
//     { name: "konicky", value: "asd asd as d" },
//   ],
//   descendents: [
//     {
//       id: "list1",
//       label: "list1, list1, list1",
//       data: [
//         { name: "celed", value: "brouk" },
//         { name: "pocet nohou", value: 12 },
//         { name: "konicky", value: "asd asd as d" },
//       ],
//       descendents: [
//         {
//           id: "list1-1",
//           label: "list1-1",
//           data: [
//             { name: "celed", value: "brouk" },
//             { name: "pocet nohou", value: 12 },
//             { name: "pocet nohou a rukou", value: 12 },
//             { name: "konicky", value: "asd asd as d" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "list2",
//       label: "list2",
//       descendents: [
//         { id: "list2-1", label: "list2-1" },
//         {
//           id: "list2-2",
//           label: "list2-2",
//           descendents: [
//             {
//               id: "list2-2-1",
//               label: "list2-2-1",
//               data: [
//                 { name: "celed", value: "brouk" },
//                 { name: "pocet nohou", value: 12 },
//                 { name: "pocet nohou a rukou", value: 12 },
//                 { name: "konicky", value: "asd asd as d" },
//               ],
//               descendents: [
//                 {
//                   id: "list2-2-1-1",
//                   label: "list2-2-1-1",
//                   data: [
//                     { name: "celed", value: "brouk" },
//                     { name: "pocet nohou", value: 12 },
//                     { name: "konicky", value: "asd asd as d" },
//                   ],
//                 },
//                 {
//                   id: "list2-2-1-2",
//                   label: "list2-2-1-2",
//                   descendents: [
//                     { id: uuid(), label: "third" },
//                     {
//                       id: uuid(),
//                       label: "level",
//                       descendents: [
//                         {
//                           id: uuid(),
//                           label: "node",
//                           data: [
//                             { name: "celed", value: "brouk" },
//                             { name: "pocet nohou", value: 12 },
//                             { name: "pocet nohou a rukou", value: 12 },
//                             { name: "konicky", value: "asd asd as d" },
//                           ],
//                           descendents: [
//                             {
//                               id: uuid(),
//                               label: "sirka",
//                               descendents: [
//                                 {
//                                   id: uuid(),
//                                   label: "node",
//                                   data: [
//                                     { name: "celed", value: "brouk" },
//                                     { name: "pocet nohou", value: 12 },
//                                     { name: "pocet nohou a rukou", value: 12 },
//                                     { name: "konicky", value: "asd asd as d" },
//                                   ],
//                                   descendents: [
//                                     {
//                                       id: uuid(),
//                                       label: "sirka",
//                                       data: [
//                                         { name: "celed", value: "brouk" },
//                                         { name: "pocet nohou", value: 12 },
//                                         {
//                                           name: "konicky",
//                                           value: "asd asd as d",
//                                         },
//                                       ],
//                                     },
//                                     {
//                                       id: uuid(),
//                                       label: "sirka1",
//                                       descendents: [
//                                         { id: uuid(), label: "third" },
//                                         {
//                                           id: uuid(),
//                                           label: "level",
//                                           data: [
//                                             { name: "celed", value: "brouk" },
//                                             { name: "pocet nohou", value: 12 },
//                                             {
//                                               name: "konicky",
//                                               value: "asd asd as d",
//                                             },
//                                           ],
//                                         },
//                                         { id: uuid(), label: "four" },
//                                       ],
//                                     },
//                                     { id: uuid(), label: "sirka2" },
//                                   ],
//                                 },
//                               ],
//                               data: [
//                                 { name: "celed", value: "brouk" },
//                                 { name: "pocet nohou", value: 12 },
//                                 { name: "konicky", value: "asd asd as d" },
//                               ],
//                             },
//                             {
//                               id: uuid(),
//                               label: "sirka1",
//                               descendents: [
//                                 { id: uuid(), label: "third" },
//                                 {
//                                   id: uuid(),
//                                   label: "level",
//                                   data: [
//                                     { name: "celed", value: "brouk" },
//                                     { name: "pocet nohou", value: 12 },
//                                     { name: "konicky", value: "asd asd as d" },
//                                   ],
//                                 },
//                                 { id: uuid(), label: "four" },
//                               ],
//                             },
//                             { id: uuid(), label: "sirka2" },
//                           ],
//                         },
//                       ],
//                       data: [
//                         { name: "celed", value: "brouk" },
//                         { name: "pocet nohou", value: 12 },
//                         { name: "konicky", value: "asd asd as d" },
//                       ],
//                     },
//                     { id: uuid(), label: "four" },
//                   ],
//                 },
//                 { id: uuid(), label: "sirka2" },
//               ],
//             },
//           ],
//           data: [
//             { name: "celed", value: "brouk" },
//             { name: "pocet nohou", value: 12 },
//             { name: "konicky", value: "asd asd as d" },
//           ],
//         },
//         { id: uuid(), label: "four" },
//       ],
//     },
//     { id: uuid(), label: "sirka2" },
//   ],
// };

type TreeProps = TreeNodeType;

export const Tree = ({ ...treeNode }: TreeProps) => {
  return (
    <div style={{ border: '1px transparent solid' }}>
      <TreeNode node={treeNode} />
    </div>
  );
};

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     edgeWrapper: {
//       position: "absolute",
//       top: 0,
//       bottom: 0,
//       left: theme.spacing(2),
//       width: theme.spacing(5),
//       zIndex: 0,
//     },
//     edgeVer: {
//       width: 1,
//       backgroundColor: theme.palette.grey["300"],
//     },
//     edgeHor: {
//       position: "absolute",
//       height: 1,
//       width: "100%",
//       backgroundColor: theme.palette.grey["300"],
//     },
//     root: {
//       position: "relative",
//       padding: theme.spacing(1, 0, 1, 5),
//     },
//     node: {
//       position: "relative",
//       padding: theme.spacing(1),
//       display: "flex",
//       flexDirection: "column",
//       width: "fit-content",
//     },
//     payloadCaption: {
//       marginRight: theme.spacing(1),
//       width: theme.spacing(13),
//     },
//     payloadEntry: {
//       display: "flex",
//       flexDirection: "row",
//       alignItems: "center",
//       borderBottomWidth: 1,
//       borderBottomStyle: "solid",
//       borderBottomColor: theme.palette.grey["200"],
//     },
//   })
// );
