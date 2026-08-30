
# SL-RC-01 Test Design

Target Module: `TM-TEST-DESIGN`

## Integration Proof — Default Slice Layer

### Happy path

```text
real application orchestration + Domain + test persistence boundary
→ capture valid material/source
→ assert durable record exists
→ assert truthful success result
```

### Persistence failure

```text
inject repository/persistence failure
→ execute Slice path
→ assert no accepted durable record
→ assert failure result
→ assert no success feedback mapping
```

### Recovery/read

```text
persist capture
→ reload through real read boundary used by later behavior
→ assert required material/source context is recoverable
```

## Reused Unit Proof

Do not duplicate every Domain rule here; reference:

```text
../domain/CaptureItem.test-design.md
../domain/SourceContext.test-design.md
```

## Methodology Direction

```text
SL-RC-01 proof design ready
→ generic Core `TM-EXACT-REALIZATION` for exact SL-RC-01 production/test code
or continue planning next Slice first
```
