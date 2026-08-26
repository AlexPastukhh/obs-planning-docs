const fs = require("fs");
const vm = require("vm");
const path = require("path");

function assert(value, message) {
  if (!value) throw new Error(message);
}

class FakeNode {
  constructor(tagName = "div", attrs = {}, text = "") {
    this.tagName = tagName.toUpperCase();
    this.attrs = {...attrs};
    this.innerText = text;
    this.textContent = text;
    this.parentElement = null;
    this.children = [];
  }
  append(...nodes) {
    for (const node of nodes) {
      node.parentElement = this;
      this.children.push(node);
    }
    return this;
  }
  getAttribute(name) { return this.attrs[name] ?? null; }
  matches(selector) {
    if (selector === "main,body") return this.tagName === "MAIN" || this.tagName === "BODY";
    if (selector === "article") return this.tagName === "ARTICLE";
    if (selector === '[data-testid^="conversation-turn-"]') return String(this.attrs["data-testid"] || "").startsWith("conversation-turn-");
    if (selector === '[data-testid*="conversation-turn" i]') return String(this.attrs["data-testid"] || "").toLowerCase().includes("conversation-turn");
    return false;
  }
  closest(selector) {
    for (let node = this; node; node = node.parentElement) if (node.matches(selector)) return node;
    return null;
  }
  descendants() {
    const out = [];
    const visit = node => { for (const child of node.children) { out.push(child); visit(child); } };
    visit(this);
    return out;
  }
  querySelectorAll(selector) {
    const nodes = this.descendants();
    if (selector === "[data-message-author-role]") return nodes.filter(n => n.getAttribute("data-message-author-role") !== null);
    if (selector === '[data-message-author-role="user"]') return nodes.filter(n => n.getAttribute("data-message-author-role") === "user");
    if (selector.includes("attachment") || selector.includes("file") || selector.includes(".diff")) {
      return nodes.filter(n => {
        const testid = String(n.getAttribute("data-testid") || "").toLowerCase();
        const klass = String(n.getAttribute("class") || "").toLowerCase();
        const metadata = ["title","aria-label","href","download"].map(k => String(n.getAttribute(k) || "").toLowerCase());
        return testid.includes("attachment") || testid.includes("file") || klass.includes("attachment") || klass.includes("file") || metadata.some(v => v.includes(".diff"));
      });
    }
    return [];
  }
}

let currentUserMessages = [];
global.location = {pathname: "/c/test12345678"};
global.document = {
  querySelector() { return null; },
  querySelectorAll(selector) { return selector === '[data-message-author-role="user"]' ? currentUserMessages : []; }
};

const adapterPath = path.resolve(__dirname, "../src/chatgpt-adapter.js");
vm.runInThisContext(fs.readFileSync(adapterPath, "utf8"), {filename: adapterPath});
const proof = global.OBSChatGPTAdapter.__test.reviewDiffAttachmentTurnPresent;

// Positive: the sent file card is a sibling of the message-author node inside one user turn.
{
  const main = new FakeNode("main");
  const article = new FakeNode("article");
  const message = new FakeNode("div", {"data-message-author-role": "user"}, "");
  const fileCard = new FakeNode("div", {"data-testid": "file-card", title: "review-positive.diff"}, "review-positive.diff");
  main.append(article.append(message, fileCard));
  currentUserMessages = [message];
  assert(proof({beforeUserMessages: 0}) === true, "same-turn sibling .diff file card was not accepted");
}

// Negative: a broad generic article contains two authored turns and only the neighboring turn has .diff.
{
  const main = new FakeNode("main");
  const article = new FakeNode("article");
  const oldTurn = new FakeNode("div");
  const oldMessage = new FakeNode("div", {"data-message-author-role": "user"}, "");
  const oldFile = new FakeNode("div", {"data-testid": "file-card", title: "older-neighbor.diff"}, "older-neighbor.diff");
  const newTurn = new FakeNode("div");
  const newMessage = new FakeNode("div", {"data-message-author-role": "user"}, "no attachment");
  main.append(article.append(oldTurn.append(oldMessage, oldFile), newTurn.append(newMessage)));
  currentUserMessages = [oldMessage, newMessage];
  assert(proof({beforeUserMessages: 1}) === false, "neighboring turn .diff crossed the authored-turn boundary");
}

// Negative: ordinary text containing .diff is not an attachment/file-card proof.
{
  const main = new FakeNode("main");
  const turn = new FakeNode("div", {"data-testid": "conversation-turn-3"});
  const message = new FakeNode("div", {"data-message-author-role": "user"}, "ordinary text mentions example.diff");
  main.append(turn.append(message));
  currentUserMessages = [message];
  assert(proof({beforeUserMessages: 0}) === false, "ordinary .diff message text was treated as attachment proof");
}

console.log("PASS chatgpt-adapter DOM turn-boundary regression");
