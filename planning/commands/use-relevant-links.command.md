# Use Relevant Links

Status: active project command definition
Scope: apply current link/navigation and evidence-grounding rules to the ongoing work and its output.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.links.use",
  "file": "use-relevant-links.command.md",
  "command": "используй ссылки",
  "englishName": "use relevant links",
  "commandFamily": [
    "используй ссылки",
    "активно используй ссылки",
    "используй ссылки где уместно",
    "use relevant links"
  ],
  "description": "Actively use useful direct links in the current work under the existing methodology rules.",
  "meaning": "Apply DOC.MARKDOWN-LINK-NAVIGATION and the applicable stable-anchor, semantic-owner-dependency and evidence-backed resolution rules to the current result. Prefer useful direct links to relevant current owners, requirements, Decisions, Findings, Proposals, examples and Evidence over bare IDs or path mentions when the reader benefits from direct traversal. For a material resolution conclusion, connect its checked basis to the claim with a concise rationale. Keep this as contextual application of existing owner contracts; it does not introduce a new linking policy or a separate link-review task.",
  "activeContextBehavior": "Preserve the current Use-Case-driven Work Context, subject, accepted meaning and work already authorized. Apply the instruction to the current response and subsequent work in that context until the USER changes it. For repository documentation already authorized for editing, use portable relative Markdown links to the relevant owner/section. For conversational output, use working links supported by the current interface. Existing task scope and permissions determine whether files may be edited; this invocation alone does not start a repository rewrite, Target, review or persistence operation.",
  "traversalReadMode": "Read or validly reuse the current navigation rule. Follow stable-anchor, Semantic Owner Dependency and resolution-grounding owners only where their analysis surface applies. Resolve the destinations actually cited in the current result, check their authority/currentness and relevant path/fragment, and use existing useful navigation rather than crawling the repository or manufacturing link targets.",
  "ownerFiles": [
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md"
  ],
  "expectedOutput": "Continue the requested work with useful inspectable links next to the relevant references and conclusions. Use direct section links when warranted, keep the relationship or supporting rationale readable, and state a material missing/unverifiable destination honestly. If no substantive output is currently requested, acknowledge the instruction compactly and apply it to the continuing context; no standalone link report is required.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use links actively where they help navigation, ownership discovery or evidence inspection; do not link every repeated mention or replace explanations with link lists.",
    "Repository Markdown uses relative links by default; link to the current canonical owner and a stable explicit semantic anchor when section-level addressability is useful.",
    "An ordinary link provides navigation/addressability only. Material restatement, contextualization, extension, representation or migration of owner meaning follows the existing Semantic Owner Dependency contract.",
    "A valid path or fragment does not establish authority or prove a claim. State the specific accepted meaning or observed fact and explain its connection to the conclusion.",
    "Use an existing USER message/log reference when available; otherwise cite the identifiable statement directly. Do not invent a message ID, link, log, Evidence or target artifact.",
    "Use a registry when a many-owner overview is more useful than many direct links; create anchors only for real addressability needs within authorized edits.",
    "Preserve the current task and authorization. This command itself grants no file mutation, test, commit or push permission and does not invoke the separate documentation-link review."
  ],
  "userTarget": "<current response / continuing work / already-authorized documentation scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.MARKDOWN-LINK-NAVIGATION",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-markdown-link-navigation",
      "why": "Owns useful direct Markdown navigation, current destinations and the boundary between navigation and stronger relations.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-explicit-stable-semantic-anchor",
      "why": "Owns stable section-level addressing when a real consumer needs it, including existing inbound-reference migration.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "DOC.SEMANTIC-OWNER-DEPENDENCY",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-semantic-owner-dependency",
      "why": "Owns explicit semantic dependence when a non-owner materially uses owner meaning; an ordinary hyperlink cannot substitute for it.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "RESOLUTION.PROPOSAL-DECISION-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
      "anchor": "resolution-claim-grounding",
      "why": "Owns inspectable accepted/Evidence basis and public rationale for material resolution claims, including Finding classifications and consequences.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
