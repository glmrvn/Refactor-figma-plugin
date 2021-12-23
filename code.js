figma.showUI(__html__, { width: 240, height: 120 })

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'codeNames') {
        // console.log(msg.codeNames)
        var compareNames = msg.codeNames

        function parentsCount(node) {
            let parentsCount = 0
            let parent = node.parent
            
            while (parent != null) {
                parentsCount++
                parent = parent.parent
            }

            return parentsCount
        }

        function isContainerFrame(node) {
            return node.type === "FRAME" && node.name.includes(":")
        }

        function isValidNode(node) {
            return node.type === "INSTANCE" || node.type === "COMPONENT" || node.type === "FRAME"
        }

        const allNodes = figma.currentPage.findAll(node => {
            if (parentsCount(node) == 2) {
                return isValidNode(node) && !isContainerFrame(node)
            } else if (parentsCount(node) == 3) {
                return isValidNode(node) && !isContainerFrame(node) && isContainerFrame(node.parent)
            } else {
                return false
            }
        })

        // SELECT TO REMOVE
        const namesToRemove = compareNames.split(",")
        const nodesToRemove = allNodes.filter(node => namesToRemove.includes(node.name))
        console.log(nodesToRemove.length)

        if (nodesToRemove.length > 0) {
            figma.currentPage.selection = nodesToRemove
            figma.viewport.scrollAndZoomIntoView(nodesToRemove)
            figma.closePlugin(`🚨 Not used in code ${nodesToRemove.length}`, nodesToRemove)
        } else {
            figma.closePlugin("👌")
        }
    }
}