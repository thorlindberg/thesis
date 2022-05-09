{"sub":"Conformance Validation Flow"}

*Non-conformance* is defined as incorrect type declaration, incorrect type instantiation, or mismatch between the two.

Handshaking is structured to interrupt validation at the first sign of non-conformance, rather than collecting errors and returning them arraryised. This choice has little impact on small amounts of information with near-instantaneous parsing, but greatly improves usability and reduces validation times as received information scale up in size.

Alternatively, the method could asynchronously return errors as/if non-conformance is encountered. As the user is informed of an error, corrects the error, and re-calls the method, the advantage is that the user does not need to care about completion, and only needs to respond to errors. For large amounts of information, the re-call would without issue run in parallel with the initial call if the initial call has not yet completed.

Validation can throw errors with the type of Object. The *valid* property is of type Boolean, indicating success (true) or failure (false). The *feedback* property is of type String and describes the first encountered non-conformance issue.

```
{ "valid": true, "feedback": '"init" property not found at top level' }
```

{"break":true}

[ A PROCESS (3) CONSISTS OF STEPS (n). EACH PROCESS IS CHECKED FOR RETURN AFTER CALL. STEPS CAN HAVE RETURNS TOO ]

The validation process consists of steps. Each step corresponds to a feature from the proposed syntax, and can return its own descriptive error if non-conformance is encountered. In the case of non-conformance, the process will not continue with the next step if any, thus reducing unnecessary computation. If non-conformance is not encountered in any step, no error will be returned.

Developers may desire for validation to continue despite non-conformance, and can in this case utilise the syntax for default values. If non-conformance is encountered but a default is defined, the process will continue with the inserted default value.

The extensible nature of the proposed syntax necessitates that validation be performed recursively, so that developers do not have to re-architect their existing data structures. As a result, the following steps may appear repetitive and validation performance scales non-linearly with data size.

<br>