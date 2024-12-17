class Main extends Setting {
    static reset() {
        this.resetSettings()
        this.addImages(this.currentPageIndex, 1)
        this.addHeading(this.currentPageIndex, 1)
    }

    static leftSwipe() {
        this.loadPage(this.decreasePageIndex(), this.animations.backward)
    }

    static rightSwipe() {
        this.loadPage(this.increasePageIndex(), this.animations.forward)
    }

    static loadPage(pageIndex, animationDirection) {
        this.addImages(pageIndex, 0)
        this.addHeading(pageIndex, 0)
        this.imageTransition(animationDirection)
        this.headingTransition(animationDirection)
    }
}

Main.reset()
