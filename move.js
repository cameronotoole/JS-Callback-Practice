function move(element) {
    element.style.position = 'fixed'


    function moveToCoordinates(left, bottom) {
        element.style.left = `${left}px`;
        element.style.bottom = `${bottom}px`;
    }

    function moveWithArrowKeys(left, bottom, callback) {
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = `${x}px`;
        element.style.bottom = `${y}px`;

        function moveCharacter() {
            // z - index - no errors / logic makes sense ? not exactly doing exactly what it's supposed to?
            const characterBounds = element.getBoundingClientRect()
            const otherElements = document.querySelectorAll('img:not([src="assets/green-character/static.gif"])')

            otherElements.forEach((otherElement) => {
                const otherBounds = otherElement.getBoundingClientRect()
                if (characterBounds.bottom > otherBounds.top) {
                    element.style.zIndex = 0
                } else {
                    element.style.zIndex = 1
                }
            })
            //

            if (direction === 'west' && x > 0) {
                x = x - 1
            }
            if (direction === 'east' && x < window.innerWidth - element.offsetWidth) {
                x = x + 1
            }
            if (direction === 'north' && y < window.innerHeight - element.offsetHeight) {
                y = y + 1
            }
            if (direction === 'south' && y > 0) {
                y = y - 1
            }
            element.style.left = `${x}px`;
            element.style.bottom = `${y}px`;
        }

        setInterval(moveCharacter, 1)

        document.addEventListener('keydown', function (e) {
            if (e.repeat) return;

            if (e.key === 'ArrowLeft') {
                direction = 'west'
            }
            if (e.key === 'ArrowRight') {
                direction = 'east'
            }
            if (e.key === 'ArrowUp') {
                direction = 'north'
            }
            if (e.key === 'ArrowDown') {
                direction = 'south'
            }

            if (callback && typeof callback === 'function') {
                callback(direction)
            }

        })

        document.addEventListener('keyup', function (e) {
            direction = null
            if (callback && typeof callback === 'function') {
                callback()
            }
        })
    }


    return {
        to: moveToCoordinates,
        withArrowKeys: moveWithArrowKeys
    }
}

