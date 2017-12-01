const ASSETS_PATH = '/assets';
const FILES_LIST = ['click'];

const soundData =  new Map();

export const playSound = (name) => {
    if (soundData.has(name)) {
        soundData.get(name).play();
    }
};

export const loadSounds = () => {
    FILES_LIST.forEach(
        (fileName) => soundData.set(fileName, new Audio(`${ASSETS_PATH}/${fileName}.mp3`))
    )
};
