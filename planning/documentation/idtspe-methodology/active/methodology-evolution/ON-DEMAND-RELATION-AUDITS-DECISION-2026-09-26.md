# On-demand Relation Audits — 2026-09-26

Status: current design decision for the candidate snapshot; not a claim that the repository has been integrated.

The two standing Target Module/Lens dependency and SDS Lens attachment maps are retired. No one maintains their Markdown rows, and no build step generates replacement map files. Typed `Semantic Owner Dependency` declarations and concrete Unit `Lens Attachments` remain in their natural owner files.

The existing read-only Planning Commands `check-tm-lens-dependency-map` and `check-lens-attachment-map` retain their command identifiers for compatibility, but now ask AI to assemble a **temporary audit table in its answer** from the current repository/supplied snapshot. They state the basis and scope, link every row to source declarations, distinguish typed dependencies from ordinary links and attachments from applicability, report unreadable/ambiguous input, and avoid a completeness claim outside the material actually read. They do not update files or present a stored map as authority. A user may separately request saving an audit result.

For command cards, Planning Helper displays the command's own explicitly declared `ownerRefs` and suppresses the extra semantic-component owner card. A generic semantic-component card without a direct command may still display its component owner. Do not add nested dependency/attachment links or compute such links from methodology documents. The previous v45 proposal to duplicate owner relations under every command is withdrawn.

Automated product checks may verify command parsing and rendering, but a temporary AI audit is not an automated integrity oracle. The broader retirement of methodology-specific tests and their UC/Contract/Process remains a separate cleanup; a green current test run still includes old methodology assertions until that cleanup is completed. Review any retained references to the retired maps as part of repository integration.
