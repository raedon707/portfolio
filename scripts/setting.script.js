/**
 * @typedef {Object} AnimationDirection
 * @property {string} imageFadeIn
 * @property {string} imageFadeOut
 * @property {string} headingFadeOut
 * @property {string} headingFadeIn
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {string} imagePath
 * @property {Array} preloadedBackgroundImageDivs
 * @property {Array} preloadedHeadingTextContainerDiv
 */

class Setting {
    /** @type {Page[]} */
    static pages = pages.map((page, index) => {
        return {
            ...page,
            id: `page_${index + 1}`,
            preloadedBackgroundImageDivs: [],
            preloadedHeadingTextContainerDiv: []
        }
    })

    /** @type {number} */
    static currentPageIndex = 0

    /** @type {number} */
    static numberOfPages = this.pages.length

    /**
     * @type {{
     *  forward: AnimationDirection,
     *  backward: AnimationDirection
     * }}
     */
    static animations = {
        backward: {
            imageFadeIn: 'image-backward-fade-in-animation',
            imageFadeOut: 'image-backward-fade-out-animation',
            headingFadeIn: 'heading-backward-fade-in-animation',
            headingFadeOut: 'heading-backward-fade-out-animation'
        },
        forward: {
            imageFadeIn: 'image-forward-fade-in-animation',
            imageFadeOut: 'image-forward-fade-out-animation',
            headingFadeIn: 'heading-forward-fade-in-animation',
            headingFadeOut: 'heading-forward-fade-out-animation'
        }
    }

    static increasePageIndex() {
        this.currentPageIndex = this.currentPageIndex >= this.numberOfPages - 1 ? 0 : this.currentPageIndex + 1
        return this.currentPageIndex
    }

    static decreasePageIndex() {
        this.currentPageIndex = this.currentPageIndex <= 0 ? this.numberOfPages - 1 : this.currentPageIndex - 1
        return this.currentPageIndex
    }

    /**
     * @param {number} pageIndex 
     * @param {number} opacity 
     */
    static addImages(pageIndex, opacity) {
        const page = this.pages[pageIndex]
        Util.pageDiv.id = page.id

        Util.backgroundContainerChildren.forEach((child, index) => {
            const imageDiv = page.preloadedBackgroundImageDivs[index]
            imageDiv.style.opacity = opacity
            imageDiv.style.animation = ''
            child.appendChild(imageDiv)
        })
    }

    /**
     * @param {number} pageIndex 
     * @param {number} opacity 
     */
    static addHeading(pageIndex, opacity) {
        const page = this.pages[pageIndex]
        const headingTextContainerDiv = page.preloadedHeadingTextContainerDiv
        headingTextContainerDiv.style.opacity = opacity
        headingTextContainerDiv.style.animation = ''

        Util.headingContainer.appendChild(page.preloadedHeadingTextContainerDiv)
    }

    /**
     * @param {AnimationDirection} animationDirection 
     */
    static imageTransition(animationDirection) {
        setTimeout(() => {
            Util.backgroundContainerChildren.forEach((child, index) => {
                child.firstChild.style.setProperty('--i', index)
                child.lastChild.style.setProperty('--i', index)
                child.firstChild.classList.add(animationDirection.imageFadeOut)
                child.lastChild.classList.add(animationDirection.imageFadeIn)

                child.firstChild.onanimationend = () => {
                    child.firstChild.style.removeProperty('--i')
                    child.lastChild.style.removeProperty('--i')
                    child.lastChild.style.opacity = 1
                    child.firstChild.onanimationend = null
                    child.firstChild.classList.remove(animationDirection.imageFadeOut)
                    child.lastChild.classList.remove(animationDirection.imageFadeIn)
                    child.replaceChild(child.lastChild, child.firstChild)
                }
            })
        }, 100)
    }

    /**
     * @param {AnimationDirection} animationDirection 
     */
    static headingTransition(animationDirection) {
        let lastDiv = null
        const currentHeadingChildren = Array(...Util.headingContainer.firstChild.children)

        currentHeadingChildren.forEach((div, index) => {
            div.style.setProperty('--i', index)
            div.onanimationend = () => {
                div.style.opacity = 0
                div.style.removeProperty('--i')
            }
            if (index === (currentHeadingChildren.length - 1)) lastDiv = div
        })

        lastDiv.onanimationend = () => {
            headingContainer.lastChild.style.opacity = 1
            headingContainer.replaceChild(headingContainer.lastChild, headingContainer.firstChild)
        }
    }

    /**
     * Resets the view
     */
    static resetSettings() {
        this.pages.forEach(page => {
            const imageUrl = page.imagePath || ''
            page.preloadedBackgroundImageDivs = [Util.createImageTag(imageUrl), Util.createImageTag(imageUrl), Util.createImageTag(imageUrl)]
            page.preloadedHeadingTextContainerDiv = document.createElement('div')
            page.preloadedHeadingTextContainerDiv.id = 'heading-text-container'

            Util.startCase(page.heading).split('').forEach(char => {
                const element = document.createElement('h1')
                element.innerHTML = char === ' ' ? '&nbsp' : char
                page.preloadedHeadingTextContainerDiv.appendChild(element)
            })
        })
    }
}
