现在主流的分布式集群一致性问题大多都吸收了PAXOS算法的思想。然而，如果完全按照Leslie Lamport的论文，实现复杂度比较高。因此，大多数实现都采用PAXOS的某种变形。Lamport的重要贡献，献是把分布式一致性的问题，形式化并给出了证明，给出了理论指导。[^1]

[^1]: DLite, [一种集群Master节点选举算法](http://blog.csdn.net/dlite/article/details/8064073)
