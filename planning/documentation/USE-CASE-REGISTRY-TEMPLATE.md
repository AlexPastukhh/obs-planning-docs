# Use-Case Registry Template

Status: active reusable template

```markdown
# <Family> Use-Case Registry

Status: active semantic registry
Parent Direction Registry: <path>

## <UC-ID> — <Semantic Name>
**Status:** <current status>
**Parent Direction:** <DIR-ID>
**Purpose:** <why this capability exists>
**Trigger / accepted input:** <recognizable entry>
**Result / end state:** <meaningful result or explicit unresolved end>
**Boundaries:** <non-goals / authority limits>
**Topology / optionality:** <when material>
**Owner route:** <canonical owner(s)>
**Scenario owner(s):** <for detailed application behavior; otherwise none>
**Required supporting reads:** <only when necessary>
**Related command:** <only when real command exists>
**Dependencies / handoffs:** <when material>
```

A registry owns semantic entries. Purpose, trigger, result, boundaries and owner route must be explicit in the registry entry itself rather than merely implied by its name or downstream workflow. Scenario files own detailed application behavior; command routing owns executable shortcuts.
