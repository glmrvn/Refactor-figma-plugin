const instances = figma.root.findAll(node => node.type === "INSTANCE" && node.parent.type === "PAGE")
const frames = figma.root.findAll(node => node.type === "FRAME" && node.parent.type === "PAGE")
const components = figma.root.findAll(node => node.type === "COMPONENT" && node.parent.type === "PAGE")

var allNames = [...frames, ...instances, ...components].map(it => it.name)
var compareNames = ["test", "name", "zoom"]

let difference = allNames.filter(x => !compareNames.includes(x));
var problemObjects = [];

for (let name in difference) {
    let frame = difference[name];
    let find = figma.root.findAll(node => node.name === frame);
    problemObjects.push(find[0]);
    continue;
}

// console.log(problemObjects)
// console.log(difference)

if (problemObjects.length > 0) {
    figma.currentPage.selection = problemObjects
    figma.viewport.scrollAndZoomIntoView(problemObjects)
    figma.closePlugin("🚨 Resources not used")
} else {
    figma.closePlugin()
}