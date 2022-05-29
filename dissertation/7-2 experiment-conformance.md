{"sec":"Implementation of Type Conformance"}

The validation process consists of steps. Each step corresponds to a feature from the proposed syntax, and can return its own descriptive error if nonconformance is encountered. In the case of nonconformance, the process will not continue with the next step if any, thus reducing unnecessary computation. If nonconformance is not encountered in any step, no error will be returned and the data structure is valid.

There are three steps in this implementation, which are the aforementioned `checkJSON`, `checkInit` and `checkData`. Each step is a hierarchy of checks, and each check can returns its own descriptive nonconformance. After a step has been called, it will be checked for a return value, which will be returned if nonconformance was detected in a check.

Developers may desire for validation to continue despite nonconformance, and can in this case utilise the syntax for default values. If nonconformance is encountered but a default is defined, the process will continue with the inserted default value.

The extensible nature of the proposed syntax necessitates that validation be performed recursively, so that developers do not have to re-architect their existing data structures. As a result, the following steps may appear repetitive and validation performance scales non-linearly with data size.

<br>

Handshaking is structured to interrupt validation at the first sign of nonconformance, rather than collecting errors and returning them arraryised. `Nonconformance` is when a type has been declared and instantiated, but the instance does not match the specification of the type. This choice has little impact on small amounts of information with near-instantaneous parsing, but greatly improves usability and reduces validation times as received information scale up in size.

Alternatively the method could asynchronously return errors as/if nonconformance is encountered. As the user is informed of an error, corrects the error, and re-calls the method, the advantage is that the user does not need to care about completion, and only needs to respond to errors. For large amounts of information, the re-call would without issue run in parallel with the initial call if the initial call has not yet completed.

{"break":true}