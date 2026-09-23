# <Bank Name>

Bank ID: `<stable-bank-id>`

## Scope

<ownership/reuse/lifecycle boundary>

## Visible Banks

- `<bank-id>`

Omit when no other registered Banks need to be visible. Visibility is explicit and non-transitive and never grants write authority.

## Vocabulary Packages

Consume:
- `vocab:<package-id>`

Omit when none are needed. Every consumed Package must be registered in the current installation; consumption does not grant evolution authority.

## Write / Mutation Policy

<only Bank-specific policy that materially differs from installation/repository defaults; otherwise omit>
