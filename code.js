figma.showUI(__html__, { width: 240, height: 120 })

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'codeNames') {
        console.log(msg.codeNames)
        var compareNames = msg.codeNames

        const instances = figma.root.findAll(node => node.type === "INSTANCE" && node.parent.type === "PAGE")
        const frames = figma.root.findAll(node => node.type === "FRAME" && node.parent.type === "PAGE")
        const components = figma.root.findAll(node => node.type === "COMPONENT" && node.parent.type === "PAGE")

        var allNames = [...frames, ...instances, ...components].map(it => it.name)

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
        // ["test", "name", "zoom"]

        if (problemObjects.length > 0) {
            figma.currentPage.selection = problemObjects
            figma.viewport.scrollAndZoomIntoView(problemObjects)
            figma.closePlugin("🚨 Not used in code")
        } else {
            figma.closePlugin()
        }
    }
}