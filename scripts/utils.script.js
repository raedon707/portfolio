class Util {
    static contentContainer = Array(...document.getElementById('container').children)

    static backgroundContainer = document.getElementById('background-container')

    static backgroundContainerChildren = Array(...this.backgroundContainer.children)

    static pageDiv = this.contentContainer[0]

    static headingContainer = document.getElementById('heading')

    static createImageTag(imageSrc) {
        const imageTag = document.createElement('img')
        imageTag.src = imageSrc
        imageTag.classList.add('background-image')
        return imageTag
    }

    static startCase(str) {
        return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    }
}
