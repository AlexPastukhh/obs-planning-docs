# Test Object Patterns

Status: active reusable supporting guidance

Test objects reduce repeated mechanics without hiding the Scenario story or moving behavior authority into helpers.

## E2E Page Object

May own:
- repeated navigation;
- stable user-facing locators;
- repeated low-level actions;
- repeated high-level page assertions when they remain clear.

Should not own:
- detailed field-validation matrices;
- business/domain logic;
- the unique Scenario input dataset by default;
- the key expected outcome hidden behind a single all-in-one method.

## Component Object

May be more stateful and may own repeated component interaction/state checks such as fill/blur/touch, visible errors, accessibility relations, disabled/pending/error/success states and controlled server-error mapping.

## Keep Visible In The Test

```text
unique Scenario path
important setup
Scenario input data
key actor action
key assertions
final expected outcome
```

## Data Ownership

Locator/config constants may live in the object. Scenario data is usually passed to action methods so the test remains readable and one object can serve several attempts. Fixture-style stored data is an explicit exception, not the default.

Do not create a global wrapper/abstraction until repeated friction justifies it; abstraction tax applies to tests too.
