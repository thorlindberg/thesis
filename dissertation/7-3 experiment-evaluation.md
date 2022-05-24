{"sec":"Evaluation Strategy"}

In this section I present a strategy on evaluating the validation library and derived syntax proposal, informed by the data provided to me and the existing process with TypeScript validation. As the txon.js library aims to standardise validation through a generic type syntax, it needs to mirror the features leveraged from TypeScript to be applicable. The purpose of implementing TXON in existing data structures would be to eliminate the reliance on GitLab, but this is a question of implementation in systems rather than data formats.

To evaluate the TXON syntax I leverage the real-world data sample from GitLab, and apply the new grammar to its existing structures. This is done to compare and contrast the readability and character count of the two data structures. Of course the data is not the only component in a validation process, and as such the TXON library and TypeScript validation must also be compared.

These processes be compared on time complexity, character count, and average execution time, but as time is not a factor considered in this implementation, the comparison will only consider character count.

[ WRITE ABOUT HOW THE TYPESCRIPT TYPES HAVE TO BE MOVED TO TXON INITIALISER ]

<p style="color:orange">
TypeScript types -> TXON types in "init".
JSON data structure -> TXON instances in "data".
Combine the two outputs into a TXON data structure.
</p>


{"break":true}