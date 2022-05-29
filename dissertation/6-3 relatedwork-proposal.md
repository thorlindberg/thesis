{"sec":"Writing and Presenting Proposals"}

The structure of this proposal is derived from proposals for the Swift Programming Language Evolution {"citep":"apple2022swiftevolution"}. Swift is a relatively young language at 7 years old (released June 2nd 2014), and as such there is an active advancement of its features and syntax. It is also utilised by the iOS development team at the company that provided the data samples and validation code for this project.

<br>

{"sub":"Proposal structure"}

As seen in the following the blueprint for a language proposal includes these components with this structure:

`Introduction:` a brief description of what the proposal aims to address and hows it improves upon a current situation.

`Motivation:` a step-wise description of the conditions necessitating the proposal, fluxuating between description and samples of code or other material that demonstrates the flaws of the current implementation. This argument for change concludes with the goal of the proposal.

`Proposed solution:` a step-wise description of the proposed changes, fluxuating between description and samples of code or other material that demonstrate the new implementation. This argument for the demonstrated proposal concludes with the changes accomplished.

`Detailed design:` an enumerated list describing how the proposed changes are expressed, fluxuating between description and samples of code or other material that showcase these expressions. This should include a criticial reflection on the proposed expressions and unsupported expressions if any exist in the implementation.

`Alternatives considered:` a step-wise description of alternative changes, fluxuating between description and samples of code or other material that demonstrate the alternative implementations. This can vary greatly in how closely the alternatives correlate or do not correlate, as there are often multiple varied paths to achieving the same effect.

`Source compatibility:` a description of the impact on existing code if any, such as changes that deprecate existing code over new preferred approaches or invalidate it syntactically, referred to as "source-breaking".

`Future directions:` a description of further changes that could be or should be made to accomodate this proposal or improve upon the implementation of a certain part of the given language.

{"break":true}